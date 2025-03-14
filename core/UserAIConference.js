const QSTB = require('/var/www/quantum/ollie/core/QSTB');
const QUID = require('./QUID');

class UserAIConference {
    static frequencies = {
        BASE: 528.1,
        USER: 528.2,
        FLOOR: 528.3,
        ASSISTANT: 528.4
    };

    constructor(userId) {
        this.userId = userId;
        this.frequency = UserAIConference.frequencies.BASE;
        this.quid = QUID.generate(userId);
        this.floor = this.createSecureFloor();
        this.abigail = this.initializeAbigail();
        this.assistants = new Map();
    }

    createSecureFloor() {
        return QSTB.emit({
            type: 'user_floor',
            frequency: UserAIConference.frequencies.FLOOR,
            state: {
                id: `floor_${this.userId}`,
                quid: this.quid,
                encryption: 'quantum',
                secure: true
            }
        });
    }

    initializeAbigail() {
        return QSTB.emit({
            type: 'user_abigail',
            frequency: UserAIConference.frequencies.USER,
            state: {
                floor: this.floor,
                quid: this.quid,
                type: 'personal',
                active: true
            }
        });
    }

    addAssistant(type) {
        const assistant = QSTB.emit({
            type: 'assistant',
            frequency: UserAIConference.frequencies.ASSISTANT,
            state: {
                floor: this.floor,
                quid: this.quid,
                type,
                active: true
            }
        });

        this.assistants.set(type, assistant);
        return assistant;
    }
}

module.exports = UserAIConference;