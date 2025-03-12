describe("🧠 MindSQL Core Database", () => {
    let db: QuantumState;
    
    test("stores and retrieves data", (done) => {
        db = new QuantumState();
        
        db.events.on('data:created', ({ collection, id, data }) => {
            const retrieved = db.read('users', { id });
            expect(retrieved[0].name).toBe('Test User');
            console.log('✨ Data stored and retrieved!');
            done();
        });

        db.create('users', {
            name: 'Test User',
            email: 'test@mindscript.dev'
        });
    });

    test("manages collections", (done) => {
        db.events.on('collection:created', ({ name }) => {
            const data = db.read(name);
            expect(data).toEqual([]);
            console.log('🗄️ New collection ready!');
            done();
        });

        db.createCollection('products');
    });
});