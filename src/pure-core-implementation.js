// Pure Core Implementation
class MindScript {
    constructor() {
        this.modules = new Map();
        this.state = new Map();
    }

    createComponent(name, renderFn) {
        return class {
            constructor(props) {
                this.state = {};
                this.props = props;
                this.element = document.createElement('div');
            }

            setState(newState) {
                this.state = { ...this.state, ...newState };
                this.render();
            }

            render() {
                this.element.innerHTML = renderFn(this.props, this.state);
                return this.element;
            }
        };
    }
}
