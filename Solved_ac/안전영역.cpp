#include <bits/stdc++.h>
using namespace std;
int n, arr[101][101], visited[101][101] = { 0, };
int ret = 0;
int dy[] = { -1, 0, 1, 0 };
int dx[] = { 0, 1, 0, -1 };

void dfs(int y, int x, int depth) {
	visited[y][x] = 1;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
		if (visited[ny][nx]) continue;
		if (arr[ny][nx] <= depth) {
			visited[ny][nx] = 1;
			continue;
		};

		dfs(ny, nx, depth);
	};
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> arr[i][j];
		};
	};

	for (int i = 0; i < 100; i++) {
		memset(visited, 0, sizeof(visited));
		int temp = 0;
		for (int j = 0; j < n; j++) {
			for (int k = 0; k < n; k++) {
				if (arr[j][k] <= i) {
					visited[j][k] = 1;
				}
				else if (!visited[j][k]) {
					dfs(j, k, i);
					temp++;
				};
			};
		};
		ret = max(temp, ret);
	};

	cout << ret << "\n";

	return 0;
}