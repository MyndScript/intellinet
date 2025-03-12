class MindTreeServer {
    constructor() {
        this.routes = {};
    }

    addRoute(method, path, handler) {
        if (!this.routes[path]) {
            this.routes[path] = {};
        }
        this.routes[path][method] = handler;
    }

    handleRequest(method, path, body) {
        const route = this.routes[path];
        if (route && route[method]) {
            return route[method](body);
        } else {
            return { status: 404, body: 'Not Found' };
        }
    }

    start() {
        console.log('MindTree server is running...');
        // Implement server start logic here
    }
}

const server = new MindTreeServer();

// Define API routes
server.addRoute('POST', '/api/branches', (body) => {
    const { name } = body;
    try {
        const branch = mindControl.createBranch(name);
        return { status: 201, body: branch };
    } catch (error) {
        return { status: 400, body: { error: error.message } };
    }
});

server.addRoute('POST', '/api/commits', (body) => {
    const { branchName, message } = body;
    try {
        const commit = mindControl.createCommit(branchName, message);
        return { status: 201, body: commit };
    } catch (error) {
        return { status: 400, body: { error: error.message } };
    }
});

server.addRoute('GET', '/api/branches', () => {
    const branches = mindControl.listBranches();
    return { status: 200, body: branches };
});

server.addRoute('GET', '/api/commits/:branchName', (body, params) => {
    const { branchName } = params;
    try {
        const commits = mindControl.listCommits(branchName);
        return { status: 200, body: commits };
    } catch (error) {
        return { status: 400, body: { error: error.message } };
    }
});

server.start();
