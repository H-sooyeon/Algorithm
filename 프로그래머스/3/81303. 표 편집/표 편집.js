// 처음 표의 행 개수 n
// 처음에 선택된 행의 위치 k
function solution(n, k, cmd) {
    let answer = new Array(n).fill('O');
    const rows = [];
    const deletedRows = [];
    let pointer = k;
    
    function Node(prev, cur, next) {
        this.prev = prev;
        this.cur = cur;
        this.next = next;
    }
    
    rows.push(new Node(null, 0, null));
    for(let i = 1; i < n - 1; i++) {
        const node = new Node(rows[i-1], i, null);
        rows[i-1].next = node;
        rows.push(node);
    }
    const lastNode = new Node(rows[rows.length - 1], n - 1, null);
    rows[rows.length - 1].next = lastNode;
    rows.push(lastNode);
    
    for(let line of cmd) {
        let [command, value] = line.split(' ');
        
        if(command === 'D') {
            value = Number(value);
            while(value > 0) {
                if(rows[pointer].next) {
                    pointer = rows[pointer].next.cur;
                }
                value -= 1;
            }
        }
        else if(command === 'C') {
            const currentNode = rows[pointer];
            const prevNode = currentNode.prev;
            const nextNode = currentNode.next;
            
            if(prevNode) prevNode.next = nextNode;
            if(nextNode) nextNode.prev = prevNode;
            
            deletedRows.push(currentNode);
            
            if(currentNode.next) {
                pointer = nextNode.cur;
            } 
            else {
                pointer = prevNode.cur;
            }
        }
        else if(command === 'U') {
            value = Number(value);
            while(value > 0) {
                if(rows[pointer].prev) {
                    pointer = rows[pointer].prev.cur;
                }
                value -= 1;
            }
        }
        else {
            // Z
            const latestDeletedNode = deletedRows.pop();
            const prevNode = latestDeletedNode.prev;
            const nextNode = latestDeletedNode.next;
            
            if(prevNode) prevNode.next = latestDeletedNode;
            if(nextNode) nextNode.prev = latestDeletedNode;
        }
    }
    
    for(let deletedRow of deletedRows) {
        answer[deletedRow.cur] = 'X';
    }
        
    return answer.join('');
}