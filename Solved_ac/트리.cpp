#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n, root, rem;
vector<int> adj[51];

int dfs(int here) {
	int ret = 0;
	int child = 0;

	for (int there : adj[here]) {
		if (there == rem) continue;
		ret += dfs(there);
		child++;
	}

	if (child == 0) return 1;
	else return ret;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	int temp;
	for (int i = 0; i < n; i++) {
		cin >> temp;
		if (temp == -1) root = i;
		else adj[temp].push_back(i);
	}

	cin >> rem;

	if (rem == root) cout << 0 << "\n";
	else {
		int result = dfs(root);
		cout << result << "\n";
	}

	return 0;
}