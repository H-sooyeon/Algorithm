function solution(nodeinfo) {
    let answer = [[]];
    const copy = nodeinfo.map((node, idx) => [idx+1, ...node]);
    
    copy.sort((a, b) => {
        if(a[2] === b[2]) {
            return a[1] - b[1];
        }
        return b[2] - a[2]
    })
        
    function Node (idx, x, y, left, right) {
        this.idx = idx;
        this.x = x;
        this.y = y;
        this.left = left;
        this.right = right;
    }
    
    const [rootIdx, rootX, rootY] = copy[0];
    const root = new Node(rootIdx, rootX, rootY, null, null);
    
    const findPos = (parent, node) => {
        if(parent.x < node.x) {
            if(parent.right) {
                findPos(parent.right, node);
                return;
            }
            parent.right = node;
        }
        else if(parent.x > node.x) {
            if(parent.left) {
                findPos(parent.left, node);
                return;
            }
            parent.left = node;
        }
    }
    
    for(let i = 1; i < copy.length; i++) {
        const [idx, x, y] = copy[i];
        const node = new Node(idx, x, y, null, null);
        findPos(root, node);
    }
    
    const preorderList = [];
    const postorderList = [];
    
    const preorder = (node) => {
        preorderList.push(node.idx);
        if(node.left) preorder(node.left);
        if(node.right) preorder(node.right);
    }
    
    const postorder = (node) => {
        if(node.left) postorder(node.left);
        if(node.right) postorder(node.right);
        postorderList.push(node.idx);
    }
    
    preorder(root);
    postorder(root);
    
    return [preorderList, postorderList];
}