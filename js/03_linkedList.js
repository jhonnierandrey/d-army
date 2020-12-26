// Node constructor     *
// LinkedList constructor   *
// add      *
// insertAt *
// removeElement    *
// removeFrom   *
// isEmpty  *  
// getSize  *
// print    *

class Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor(params) {
        this.head = null;
        this.size = 0;
    }

    add(data){
        const newNode = new Node(data, null)
        if(!this.head){
            this.head = newNode
        }else{
            let current = this.head;
            while(current.next){
                current = current.next;
            };
            current.next = newNode
        }

        this.size++;
    }

    insertAt(data, index){
        if(index < 0 || index > this.size){
            return null;
        }

        const newNode = new Node(data);
        let current = this.head;
        let previous;

        if(index === 0){
            newNode.next = current;
            this.head = newNode;
        }else{
            for(let i = 0; i < index; i++){
                previous = current
                current = current.next;
            }

            newNode.next = current;
            previous.next = newNode;
        };
        this.size++;
    };

    print(){
        if(!this.size){
            return null;
        };
        let current = this.head;
        let result = ' ';

        while(current){
            result += current.data += ' -> ';
            current = current.next;
        }

        result += 'X';
        return result;
    };

    removeData(data){
        let current = this.head;
        let previous = null;

        while(current != null ){
            if(current.data === data){
                if(!previous){
                    this.head = current.next;
                }else{
                    previous.next = current.next;
                }
                this.size--;
                return current.data;
            }

            previous = current;
            current = current.next;
        };

        return null;
    };

    removeFrom(index){
        if(index < 0 || index > this.size){
            return null;
        };
        let current = this.head;
        let previous = null;

        if(index === 0){
            this.head = current.next;
        }else{
            for(let i = 0; i < index; i++){
                previous = current
                current = current.next;
            }
            previous.next = current.next;
        }

        this.size--;
        return current.data;
    };

    isEmpty(){
        return this.size === 0;
        // if(this.size === 0){
        //     return true;
        // }else{
        //     return false;
        // }
    }

    getSize(){
        return this.size;
    }
}

//const testNode = new Node('test', null);

const linkedList = new LinkedList();

linkedList.add(12);
linkedList.add(99);
linkedList.insertAt(10, 1)

console.log(linkedList.isEmpty())
console.log(linkedList.getSize())

console.log(linkedList.removeFrom(1))
linkedList.removeData(0)
console.log(linkedList.print())
console.log(linkedList)