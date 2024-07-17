function solution(nodeinfo) {
    const Node = function(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
        
        this.parent = null;
        this.left = null;
        this.right = null;
    }
    
    const addNode = (parent, child) => {
        if(child.x < parent.x) {
            if(!parent.left) {
                parent.left = child;
                child.parent = parent;
            }
            else {
                addNode(parent.left, child);
            }
        }
        else {
            if(!parent.right) {
                parent.right = child;
                child.parent = parent;
            }
            else {
                addNode(parent.right, child);
            }
        }
    }
    
    let answer = [];
    let nodes = [];
    let preNodes = [];
    let postNodes = [];
    
    for(let i = 0; i < nodeinfo.length; i++) {
        let node = new Node(i + 1, nodeinfo[i][0], nodeinfo[i][1]);
        nodes.push(node);
    }
        
    // y를 기준으로 내림차순 정렬
    nodes.sort((a, b) => {
        if(a.y === b.y) {
            return a.x - b.x;
        }
        return b.y - a.y;
    });
    
    let root = nodes[0];
    for(let i = 1; i < nodes.length; i++) {
        addNode(root, nodes[i]);
    }
    
    const preOrder = (node) => {
        preNodes.push(node.value);
        
        if(node.left) {
            preOrder(node.left);
        }
        if(node.right) {
            preOrder(node.right);
        }
    }
    
    const postOrder = (node) => {
        if(node.left) {
            postOrder(node.left);
        }
        if (node.right) {
            postOrder(node.right);
        }
        
        postNodes.push(node.value);
    }
    
    preOrder(root);
    postOrder(root);
    
    answer.push(preNodes);
    answer.push(postNodes);
    
    return answer;
}