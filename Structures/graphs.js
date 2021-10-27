class Graph {
    constructor() {
        this.vertices = {}; // список смежности графа
    }

    addVertex(value) {
        if (!this.vertices[value]) {
            this.vertices[value] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
            throw new Error('В графе нет таких вершин');
        }

        if (!this.vertices[vertex1].includes(vertex2)) {
            this.vertices[vertex1].push(vertex2);
        }
        if (!this.vertices[vertex2].includes(vertex1)) {
            this.vertices[vertex2].push(vertex1);
        }
    }

    dfs(startVertex, callback) {
        let list = this.vertices; // список смежности
        let stack = [startVertex]; // стек вершин для перебора
        let visited = { [startVertex]: 1 }; // посещенные вершины

        function handleVertex(vertex) {
            // вызываем коллбэк для посещенной вершины
            callback(vertex);

            // получаем список смежных вершин
            let reversedNeighboursList = [...list[vertex]].reverse();

            reversedNeighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    // отмечаем вершину как посещенную
                    visited[neighbour] = 1;
                    // добавляем в стек
                    stack.push(neighbour);
                }
            });
        }

        // перебираем вершины из стека, пока он не опустеет
        while(stack.length) {
            let activeVertex = stack.pop();
            handleVertex(activeVertex);
        }

        // проверка на изолированные фрагменты
        stack = Object.keys(this.vertices);

        while(stack.length) {
            let activeVertex = stack.pop();
            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                handleVertex(activeVertex);
            }
        }
    }

    bfs(startVertex, callback) {
        let list = this.vertices; // список смежности
        let queue = [startVertex]; // очередь вершин для перебора
        let visited = { [startVertex]: 1 }; // посещенные вершины

        function handleVertex(vertex) {
            // вызываем коллбэк для посещенной вершины
            callback(vertex);

            // получаем список смежных вершин
            let neighboursList = list[vertex];

            neighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    queue.push(neighbour);
                }
            });
        }

        // перебираем вершины из очереди, пока она не опустеет
        while(queue.length) {
            let activeVertex = queue.shift();
            handleVertex(activeVertex);
        }

        queue = Object.keys(this.vertices);

        // Повторяем цикл для незатронутых вершин
        while(queue.length) {
            let activeVertex = queue.shift();
            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                handleVertex(activeVertex);
            }
        }
    }

    bfs2(startVertex) {
        let list = this.vertices;
        let queue = [startVertex];
        let visited = { [startVertex]: 1 };

        // кратчайшее расстояние от стартовой вершины
        let distance = { [startVertex]: 0 };
        // предыдущая вершина в цепочке
        let previous = { [startVertex]: null };

        function handleVertex(vertex) {
            let neighboursList = list[vertex];

            neighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    queue.push(neighbour);
                    // сохраняем предыдущую вершину
                    previous[neighbour] = vertex;
                    // сохраняем расстояние
                    distance[neighbour] = distance[vertex] + 1;
                }
            });
        }

        // перебираем вершины из очереди, пока она не опустеет
        while(queue.length) {
            let activeVertex = queue.shift();
            handleVertex(activeVertex);
        }

        return { distance, previous }
    }

    findShortestPath(startVertex, finishVertex) {
        let result = this.bfs2(startVertex);

        if (!(finishVertex in result.previous))
            throw new Error(`Нет пути из вершины ${startVertex} в вершину ${finishVertex}`);

        let path = [];

        let currentVertex = finishVertex;

        while(currentVertex !== startVertex) {
            path.unshift(currentVertex);
            currentVertex = result.previous[currentVertex];
        }

        path.unshift(startVertex);

        return path;
    }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('C', 'D');
graph.addEdge('C', 'E');
graph.addEdge('A', 'F');
graph.addEdge('F', 'G');

//graph.dfs('A', v => console.log(v));

graph.findShortestPath('A', 'G');