import { QuantumState } from '../quantum/State';
import { createHash } from 'crypto';

interface User {
    username: string;
    email: string;
    password: string;
    focusLevel: number;
    loginAttempts: number;
    lastAttempt?: Date;
    resetToken?: string;
    resetTokenExpiry?: Date;
}

export class UserSystem {
    private state: QuantumState;
    private users: Map<string, User>;
    private emailToUsername: Map<string, string>;

    constructor() {
        this.state = new QuantumState();
        this.users = new Map();
        this.emailToUsername = new Map();
    }

    private hashPassword(password: string): string {
        return createHash('sha256').update(password).digest('hex');
    }

    private generateResetToken(): string {
        return createHash('sha256')
            .update(Math.random().toString())
            .digest('hex')
            .slice(0, 32);
    }

    register(user: { username: string; email: string; password: string }) {
        if (this.users.has(user.username)) {
            return {
                success: false,
                message: '🎭 This username is already focusing with us!'
            };
        }

        if (this.emailToUsername.has(user.email)) {
            return {
                success: false,
                message: '📧 This email is already on a focus journey!'
            };
        }

        const hashedPassword = this.hashPassword(user.password);
        
        this.users.set(user.username, {
            ...user,
            password: hashedPassword,
            focusLevel: 1.0,
            loginAttempts: 0
        });

        this.emailToUsername.set(user.email, user.username);

        return {
            success: true,
            message: '🎯 New focus buddy registered!'
        };
    }

    login(credentials: { username: string; password: string }) {
        const user = this.users.get(credentials.username);

        if (!user) {
            return {
                success: false,
                focusLevel: 0,
                message: '🌫️ Brain fog! Username not found!'
            };
        }

        // Check lockout
        if (user.loginAttempts >= 5 && user.lastAttempt) {
            const lockoutTime = 15 * 60 * 1000; // 15 minutes
            if (Date.now() - user.lastAttempt.getTime() < lockoutTime) {
                return {
                    success: false,
                    focusLevel: 0,
                    lockout: true,
                    message: '🎧 Time for a quick break! Try again in 15 minutes'
                };
            }
            // Reset attempts after lockout period
            user.loginAttempts = 0;
        }

        const hashedPassword = this.hashPassword(credentials.password);
        if (hashedPassword !== user.password) {
            user.loginAttempts++;
            user.lastAttempt = new Date();
            this.users.set(credentials.username, user);

            return {
                success: false,
                focusLevel: 0,
                message: '🌫️ Brain fog! Password mismatch!'
            };
        }

        // Successful login
        user.loginAttempts = 0;
        user.lastAttempt = new Date();
        this.users.set(credentials.username, user);

        return {
            success: true,
            focusLevel: 1.0,
            message: '🎧 Focus mode activated! Welcome back!'
        };
    }

    requestPasswordReset(email: string) {
        const username = this.emailToUsername.get(email);
        if (!username) {
            return {
                success: false,
                message: '📧 Email not found in our focus system!'
            };
        }

        const user = this.users.get(username);
        if (!user) return { success: false };

        const token = this.generateResetToken();
        user.resetToken = token;
        user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        this.users.set(username, user);

        return {
            success: true,
            token,
            message: '🎯 Password reset link created! Check your email!'
        };
    }

    resetPassword({ email, token, newPassword }: { 
        email: string; 
        token: string; 
        newPassword: string 
    }) {
        const username = this.emailToUsername.get(email);
        if (!username) return { success: false };

        const user = this.users.get(username);
        if (!user || 
            user.resetToken !== token || 
            !user.resetTokenExpiry ||
            user.resetTokenExpiry < new Date()) {
            return {
                success: false,
                message: '⌛ Reset link expired! Request a new one!'
            };
        }

        user.password = this.hashPassword(newPassword);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        this.users.set(username, user);

        return {
            success: true,
            message: '🎯 Password updated! Ready to focus again!'
        };
    }
}