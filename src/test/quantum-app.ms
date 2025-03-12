consciousness QuantumApp {
    quantum_field {
        title: String = "MindScript Test App",
        counter: Number = 0,
        theme: Object = {
            primary: "#3498db",
            secondary: "#2ecc71"
        }
    }

    neural_paths {
        connect UserInput -> StateManager
        connect StateManager -> RenderEngine
        
        process_event "increment" {
            this.counter += 1
            emit "state_changed"
        }
    }

    render_matrix {
        element: "div",
        styles: {
            backgroundColor: this.theme.primary,
            padding: "20px"
        },
        children: [
            {
                element: "h1",
                content: this.title
            },
            {
                element: "button",
                content: `Count: ${this.counter}`,
                events: {
                    click: "increment"
                }
            }
        ]
    }
}