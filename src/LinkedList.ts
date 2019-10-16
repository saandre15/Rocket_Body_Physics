export class LinkedList<T> {
    private head: Node<T>;
    constructor() {
        this.head = null;
    }
    add(node: Node<T>): void {
        if(this.head === null) {
            this.head = node;
            this.head.length = 0;
        }
        else {
            node.tail = this.head;
            const length: number = this.head.length;
            this.head = node;
            this.head.length = length + 1;
        }
    }
    toArray(): Node<T>[] {
        const array: Node<T>[] = new Array<Node<T>>(this.head.length).fill(null);
        let node: Node<T> = this.head.tail;
        let counter: number = 0;
        while(node.tail !== null) {
            array[this.head.length - counter] = node;
            node = node.tail;
            counter++;
        }
        return array;
    }
    toDataArray(): T[] {
        const array: T[] = new Array<T>(this.head.length);
        let node: Node<T> = this.head.tail;
        let counter: number = 0;
        while(node.tail !== null) {
            array[this.head.length - counter] = node.data;
            node = node.tail;
            counter++;
        }
        return array;
    }
}

export class Node<T> {
    length: number;
    data: T;
    tail: Node<T> | null;
    constructor(data: T) {
        this.data = data;
        this.tail = null;
    }
}