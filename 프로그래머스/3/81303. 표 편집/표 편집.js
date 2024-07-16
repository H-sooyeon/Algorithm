function solution(n, k, cmd) {
    let answer = new Array(n).fill('O');
    
    const Node = function(idx, prevNode) {
        this.idx = idx;
        this.prev = prevNode;
        this.next;
    }
    
    let root = new Node(0);
    let curNode = root;
    let prevNode = root;
    
    for(let i = 1; i < n; i++) {
        const newNode = new Node(i, prevNode);
        prevNode.next = newNode;
        
        if(i === k) {
            curNode = newNode;
        }
        
        prevNode = newNode;
    }
    
    let history = [];
    cmd.map((command) => {
        const [commandLine, count] = command.split(' ');
        let idxCnt = 0;
        switch(commandLine) {
            case 'U':
                while(idxCnt < count && curNode.prev) {
                    curNode = curNode.prev;
                    idxCnt++;
                }
                break;
            case 'D':
                while(idxCnt < count && curNode.next) {
                    curNode = curNode.next;
                    idxCnt++;
                }
                break;
            case 'C':
                history.push(curNode);
                const prev = curNode.prev;
                const next = curNode.next;
                
                if(prev && next) {
                    prev.next = next;
                    next.prev = prev;
                    curNode = next;
                }
                else if(prev) {
                    prev.next = next;
                    curNode = prev;
                }
                else if(next) {
                    next.prev = null;
                    curNode = next;
                }
                break;
            case 'Z':
                const node = history.pop();
                const prevNode = node.prev;
                const nextNode = node.next;
                
                if(prevNode) {
                    prevNode.next = node;
                }
                if(nextNode) {
                    nextNode.prev = node;
                }
                break;
        }
    })
    
    history.map((node) => {
        answer[node.idx] = 'X';
    })
    
    return answer.join('');
}