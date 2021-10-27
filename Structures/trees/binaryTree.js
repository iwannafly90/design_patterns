class BinaryTreeNode {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;
    }

    get height() {
        let leftHeight = this.left ? this.left.height + 1 : 0;
        let rightHeight = this.right ? this.right.height + 1 : 0;
        return Math.max(leftHeight, rightHeight);
    }

    setLeft(node) {
        if (this.left) {
            this.left.parent = null;
        }
        if (node) {
            this.left = node;
            this.left.parent = this;
        }
    }

    setRight(node) {
        if (this.right) {
            this.right.parent = null;
        }
        if (node) {
            this.right = node;
            this.right.parent = this;
        }
    }
}

//поиск в глубину
function traverseDFRecursive(node, callback) {
    // выполнение коллбэка для самого узла
    callback(node);

    // выполнение коллбэка для левого потомка
    if (node.left) {
        traverseDFRecursive(node.left, callback);
    }

    // выполнение коллбэка для правого потомка
    if (node.right) {
        traverseDFRecursive(node.right, callback);
    }
}

function traverseDF(root, callback) {
    traverseDFRecursive(root, callback);
}


//обход в ширину
class Queue {
    constructor() {
        this.arr = [];
    }
    enqueue(value) {
        this.arr.push(value);
    }
    dequeue() {
        return this.arr.shift();
    }
    isEmpty() {
        return this.arr.length == 0;
    }
}

function traverseBF(root, callback) {
    let nodeQueue = new Queue();
    nodeQueue.enqueue(root);

    while(!nodeQueue.isEmpty()) {
        let currentNode = nodeQueue.dequeue();

        // Вызываем коллбэк для самого узла
        callback(currentNode);

        // Добавляем в очередь левого потомка
        if (currentNode.left) {
            nodeQueue.enqueue(currentNode.left);
        }

        // Добавляем в очередь правого потомка
        if (currentNode.right) {
            nodeQueue.enqueue(currentNode.right);
        }
    }
}

let aNode = new BinaryTreeNode('a');

let bNode = new BinaryTreeNode('b');
aNode.setLeft(bNode);

let cNode = new BinaryTreeNode('c');
aNode.setRight(cNode);

let dNode = new BinaryTreeNode('d');
bNode.setRight(dNode);

let eNode = new BinaryTreeNode('e');
cNode.setLeft(eNode);

let fNode = new BinaryTreeNode('f');
cNode.setRight(fNode);


traverseDF(aNode, node => console.log(node.value));
traverseBF(aNode, node => console.log(node.value));
