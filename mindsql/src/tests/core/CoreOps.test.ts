import { CoreOperations } from '../../core/operations/CoreOps';
import { describe, test, expect } from '../../quantum/testing';

describe("🎯 MindSQL Core Operations", () => {
    let ops: CoreOperations;

    test("performs basic CRUD operations", () => {
        ops = new CoreOperations();

        // Create
        const entity = ops.create({ name: "Test Entity" });
        expect(entity.data.name).toBe("Test Entity");

        // Read
        const read = ops.read(entity.id);
        expect(read.name).toBe("Test Entity");

        // Update
        const updated = ops.update(entity.id, { status: "active" });
        expect(updated.status).toBe("active");

        // Delete
        const deleted = ops.delete(entity.id);
        expect(deleted).toBe(true);

        console.log("✨ Core operations verified!");
    });
});