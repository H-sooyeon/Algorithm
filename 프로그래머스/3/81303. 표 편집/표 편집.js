function solution(n, k, cmd) {
    let answer = '';
    const nodes = new Array(n);
    let curFocus = k;
    const deletedNodes = [];
    const nodesResult = new Array(n).fill(false);
    
    function Node(id, prev, next) {
        this.id = id;
        this.prev = prev;
        this.next = next;
    }
    
    nodes[0] = new Node(0, null, null);
    
    for(let i = 1; i < n; i++) {
        const node = new Node(i, nodes[i-1], null);
        nodes[i] = node;
    }
    
    nodes[n-1].next = null;
    
    for(let i = n - 2; i >= 0; i--) {
        nodes[i].next = nodes[i+1];
    }
    
    const up = (move, curFocus) => {
        let targetNode = nodes[curFocus];
        for(let i = 0; i < move; i++) {
            if(nodes[targetNode.id].prev) {
                targetNode = nodes[targetNode.id].prev;
            }
        }
        
        return targetNode.id;
    }
    
    const down = (move, curFocus) => {
        let targetNode = nodes[curFocus];
        for(let i = 0; i < move; i++) {
            if(nodes[targetNode.id].next) {
                targetNode = nodes[targetNode.id].next;
            }
        }
        
        return targetNode.id;
    }
    
    const deleteCurRow = () => {
        deletedNodes.push(nodes[curFocus]);
        // 삭제된 행이 가장 마지막 행인 경우 바로 윗 행 선택
        const prevNode = nodes[curFocus].prev;
        const nextNode = nodes[curFocus].next;
            
        if(prevNode && nextNode) {
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
            curFocus = nextNode.id;
        }
        else if(!prevNode && nextNode) {
            nextNode.prev = null;
            curFocus = nextNode.id;
        }
        else if(prevNode && !nextNode) {
            curFocus = prevNode.id;
            prevNode.next = null;
        }
    }
    
    const restoration = () => {
        const lastDeletedNode = deletedNodes.pop();
        const prevNode = lastDeletedNode.prev;
        const nextNode = lastDeletedNode.next;
        
        if(prevNode) {
            prevNode.next = lastDeletedNode;
        }
        if(nextNode) {
            nextNode.prev = lastDeletedNode;
        }
    }
    
    cmd.forEach((item) => {
        const [command, move] = item.split(' ');
        // console.log('command', command, 'move', move, 'curFocus', curFocus);
        
        if(command === 'U') {
            curFocus = up(parseInt(move), curFocus);
            // console.log('up', curFocus)
        }
        else if(command === 'D') {
            curFocus = down(parseInt(move), curFocus);
            // console.log('down', curFocus);
        }
        else if(command === 'C') {
            deleteCurRow();
            // console.log('delete', curFocus);
        }
        else if(command === 'Z') {
            restoration();
            // console.log('restoration', curFocus);
        }
    })
    
    for(let node of deletedNodes) {
        nodesResult[node.id] = true;
    }
    
    for(let isDeletedNode of nodesResult) {
        if(isDeletedNode) answer += 'X';
        else answer += 'O';
    }
    
    return answer;
}