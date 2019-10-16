var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
    }
    LinkedList.prototype.add = function (node) {
        if (this.head === null) {
            this.head = node;
            this.head.length = 0;
        }
        else {
            node.tail = this.head;
            var length_1 = this.head.length;
            this.head = node;
            this.head.length = length_1 + 1;
        }
    };
    LinkedList.prototype.toArray = function () {
        var array = new Array(this.head.length).fill(null);
        var node = this.head.tail;
        var counter = 0;
        while (node.tail !== null) {
            array[this.head.length - counter] = node;
            node = node.tail;
            counter++;
        }
        return array;
    };
    LinkedList.prototype.toDataArray = function () {
        var array = new Array(this.head.length);
        var node = this.head.tail;
        var counter = 0;
        while (node.tail !== null) {
            array[this.head.length - counter] = node.data;
            node = node.tail;
            counter++;
        }
        return array;
    };
    return LinkedList;
}());
export { LinkedList };
var Node = /** @class */ (function () {
    function Node(data) {
        this.data = data;
        this.tail = null;
    }
    return Node;
}());
export { Node };
