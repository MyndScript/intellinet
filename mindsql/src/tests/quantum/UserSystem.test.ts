import { QuantumState } from '../../quantum/State';
import { AIEnhancedEventEmitter } from '../../core/events';
import { describe, test, expect } from '../../quantum/testing';
import { UserSystem } from '../../core/UserSystem';

describe('Brain Access System', () => {
    let userSystem: UserSystem;
    let state: QuantumState;

    test('keeps user data organized', () => {
        userSystem = new UserSystem();
        const validUser = {
            username: 'Abigail',
            email: 'abigail@focus.dev',
            password: 'Focus2025!'
        };

        const result = userSystem.register(validUser);
        expect(result.success).toBe(true);

        const invalidUser = {
            username: 'Abigail',  // Duplicate
            email: 'another@focus.dev',
            password: 'Test123!'
        };
        const duplicateResult = userSystem.register(invalidUser);
        expect(duplicateResult.success).toBe(false);
    });

    test('helps remember login details', () => {
        const goodLogin = userSystem.login({
            username: 'Abigail',
            password: 'Focus2025!'
        });
        expect(goodLogin.focusLevel).toBeGreaterThan(0.8);

        const badLogin = userSystem.login({
            username: 'Abigail',
            password: 'WrongPassword!'
        });
        expect(badLogin.success).toBe(false);
    });

    test('assists with password recovery', () => {
        const resetRequest = userSystem.requestPasswordReset('abigail@focus.dev');
        expect(resetRequest.success).toBe(true);

        const resetResult = userSystem.resetPassword({
            email: 'abigail@focus.dev',
            token: resetRequest.token,
            newPassword: 'NewFocus2025!'
        });
        expect(resetResult.success).toBe(true);

        // Verify new password works
        const loginAfterReset = userSystem.login({
            username: 'Abigail',
            password: 'NewFocus2025!'
        });
        expect(loginAfterReset.success).toBe(true);
    });

    test('protects against focus disruption', () => {
        // Rate limiting test
        const attempts = Array(5).fill(null).map(() => 
            userSystem.login({
                username: 'Abigail',
                password: 'WrongPassword!'
            })
        );
        
        const lastAttempt = attempts[attempts.length - 1];
        expect(lastAttempt.lockout).toBe(true);
        expect(lastAttempt.message).toBe('🎧 Time for a quick break! Try again in 15 minutes');
    });
});