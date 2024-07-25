function solution(numbers) {
    let answer = [];
    
    const make_complete_binaryTree = (num) => {
        let binary = num.toString(2);
        const binary_len = binary.length;
        // n개의 노드를 가진 완전이진트리의 높이는 log2(n+1)
        const tree_height = Math.ceil(Math.log2(binary_len + 1));
        // 높이 h인 포화이진트리에 있는 노드의 수는 2^h-1
        const node_cnt = 2 ** tree_height - 1;
        
        binary = '0'.repeat(node_cnt - binary_len) + binary;
        
        return binary;
    }
    
    const is_possible_tree = (tree, parent) => {
        // 부모 노드가 0이고 자식 노드가 1이 될 수 없음
        if(parent === '0' && tree.indexOf('1') !== -1) return false;
        
        if(tree.length <= 1) return true;
        
        // 포화이진트리는 항상 노드의 개수가 홀수이므로 tree의 절반 값이 루트 노드
        let idx = parseInt(tree.length / 2);
        let root_node = tree[idx];
    
        // 루트 노드를 기준으로 오른쪽 자식 노드, 왼쪽 자식 노드 검사
        let left_tree = tree.slice(0, idx);
        let right_tree = tree.slice(idx + 1);
        
        let left_child = is_possible_tree(left_tree, root_node);
        let right_child = is_possible_tree(right_tree, root_node);
        
        if(left_child && right_child) return true;
        else return false;
    }
    
    for(let i = 0; i < numbers.length; i++) {
        const binary = make_complete_binaryTree(numbers[i]);
        let idx = parseInt(binary.length / 2);
        let root_node = binary[idx];
    
        // 루트 노드를 기준으로 오른쪽 자식 노드, 왼쪽 자식 노드 검사
        let left_tree = binary.slice(0, idx);
        let right_tree = binary.slice(idx + 1);
        
        let left_child = is_possible_tree(left_tree, root_node);
        let right_child = is_possible_tree(right_tree, root_node);
        
        if(left_child && right_child) {
            answer.push(1);
        }
        else {
            answer.push(0);
        }
    }
    
    return answer;
}