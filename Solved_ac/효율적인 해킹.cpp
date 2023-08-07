#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n, m, visited[10001];
vector<int> adj[10001];

int dfs(int here) {
	visited[here] = 1;
	int ret = 1;
	for (int there : adj[here]) {
		if (visited[there]) continue;
		ret += dfs(there);
	}
	return ret;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;

	int temp1, temp2;
	for (int i = 0; i < m; i++) {
		cin >> temp1 >> temp2;
		adj[temp2].push_back(temp1);
	}
	 
	int dp[10001];
	int mx = 0;
	for (int i = 1; i <= n; i++) {
		 fill(&visited[0], &visited[0] + 10001, 0);
		 dp[i] = dfs(i);

		 mx = max(dp[i], mx);
	}

	for (int i = 1; i <= n; i++) {
		if (mx == dp[i]) cout << i << " ";
	}
	cout << "\n";


	return 0;
}