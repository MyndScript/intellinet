consciousness QuantumButton {
    quantum_field {
        label: String = "Click Me",
        clicked: Number = 0
    }

    neural_paths {
        connect Click -> Counter
        process_event "increment" {
            this.clicked += 1
        }
    }

    render_matrix {
        element: "button",
        content: this.label,
        events: {
            click: "increment"
        }
    }
}