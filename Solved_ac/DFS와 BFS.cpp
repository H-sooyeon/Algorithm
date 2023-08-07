#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <algorithm>
#include <cstring>
using namespace std;
int n, m, v;
vector<int> outv[1001];
int visited[1001];

void dfs(int start) {
	visited[start] = 1;

	cout << start << " ";

	for (int i = 0; i < outv[start].size(); i++) {
		if (!visited[outv[start][i]]) dfs(outv[start][i]);
	}
}

void bfs(int start) {
	queue<int> q;
	q.push(start);
	visited[start] = 1;

	cout << start << " ";

	while (q.size()) {
		int here = q.front();
		q.pop();

		for (int there : outv[here]) {
			if (!visited[there]) {
				q.push(there);
				visited[there] = 1;
				cout << there << " ";
			}
		}
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cout.tie(NULL);
	cin.tie(NULL);

	vector<int> inv;

	cin >> n >> m >> v;
	int a, b;
	for (int i = 0; i < m; i++) {
		cin >> a >> b;
		outv[a].push_back(b);
		outv[b].push_back(a);
	}

	for (int i = 1; i <= n; i++) {
		sort(outv[i].begin(), outv[i].end());
	}

	dfs(v);
	cout << "\n";
	memset(visited, 0, sizeof(visited));
	bfs(v);



	return 0;
}