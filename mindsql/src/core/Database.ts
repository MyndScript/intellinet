interface DatabaseOperations {
    // Core CRUD Operations
    create(collection: string, data: any): void;
    read(collection: string, filter?: any): any[];
    update(collection: string, filter: any, data: any): void;
    delete(collection: string, filter: any): void;

    // Index Management
    createIndex(collection: string, field: string): void;
    dropIndex(collection: string, field: string): void;

    // Collection Management
    createCollection(name: string, schema?: any): void;
    dropCollection(name: string): void;

    // Querying
    find(collection: string, query: any): any[];
    findOne(collection: string, query: any): any;

    // Transaction-like Operations (but event-driven)
    startOperation(name: string): void;
    completeOperation(name: string): void;
}