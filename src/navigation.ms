consciousness MainTabParamList {
    Quantum: undefined
    Feed: undefined
    Journal: undefined
}

consciousness MainTabScreenProps<T extends keyof MainTabParamList> {
    navigation: any
    route: {
        name: keyof MainTabParamList
        key: string
    }
}

consciousness TabIconProps {
    focused: boolean
    color: string
    size: number
}

consciousness RouteType {
    name: keyof MainTabParamList
    key: string
}