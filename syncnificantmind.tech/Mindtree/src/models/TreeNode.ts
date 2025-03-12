interface TreeNode {
    timestamp: Date;
    depth: number;
    changes: CodeChange[];
    children: TreeNode[];
    foundation: boolean;  // True if node is part of trunk
    weight: number;      // Increases as time passes
}

interface CodeChange {
    file: string;
    diff: string;
    impact: number;     // How foundational this change is
}