import { StateLogger } from '../../utils/StateLogger';
import { QuantumState } from '../../quantum/State';

describe('StateLogger', () => {
    let logger: StateLogger;
    let state: QuantumState;

    beforeEach(() => {
        logger = StateLogger.getInstance();
        logger.clear();
        state = new QuantumState();
    });

    test('should maintain singleton instance', () => {
        const logger1 = StateLogger.getInstance();
        const logger2 = StateLogger.getInstance();
        expect(logger1).toBe(logger2);
    });

    test('should log state changes', () => {
        logger.log(state);
        const buffer = logger.getBuffer();
        expect(buffer.length).toBe(1);
        expect(buffer[0]).toContain(state.toString());
    });

    test('should notify listeners of state changes', () => {
        const mockListener = jest.fn();
        logger.addListener(mockListener);
        logger.log(state);
        expect(mockListener).toHaveBeenCalledWith(state);
    });

    test('should remove listeners', () => {
        const mockListener = jest.fn();
        logger.addListener(mockListener);
        logger.removeListener(mockListener);
        logger.log(state);
        expect(mockListener).not.toHaveBeenCalled();
    });
});