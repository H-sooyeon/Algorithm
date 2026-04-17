// 노드 번호와 순서는 상관 없음
// y 값이 큰 노드가 부모 노드에 해당
// y 값을 기준으로 내림차순 정렬
// y 값이 같다면 x 값을 기준으로 오름차순 정렬
function solution(nodeinfo) {    
    function Node(id, y, x) {
        this.id = id;
        this.y = y;
        this.x = x;
        this.left = null;
        this.right = null;
    }
    
    const nodes = nodeinfo.map((value, idx) => new Node(idx + 1, value[1], value[0]));
    nodes.sort((a, b) => {
        if(a.y === b.y) return a.x - b.x;
        return b.y - a.y;
    })
    
    // 노드들 연결시키기
    const connectParent = (parent, curNode) => {
        if(!parent.left && parent.x > curNode.x) {
            parent.left = curNode;
            return;
        }
        if(!parent.right && parent.x < curNode.x) {
            parent.right = curNode;
            return;
        }
        
        if(parent.x < curNode.x) connectParent(parent.right, curNode);
        else connectParent(parent.left, curNode);
    }
    
    const root = nodes[0];
    for(let i = 1; i < nodes.length; i++) {
        connectParent(root, nodes[i]);
    }
        
    // 전위순회
    const preorderArr = [];
    const preorder = (node) => {
        preorderArr.push(node.id);
        
        if(node.left) preorder(node.left);
        if(node.right) preorder(node.right);
    }
    
    // 후위순회
    const postorderArr = []
    const postorder = (node) => {
        if(node.left) postorder(node.left);
        if(node.right) postorder(node.right);
        
        postorderArr.push(node.id);
    }
    
    preorder(root);
    postorder(root);
    
    return [preorderArr, postorderArr];
}