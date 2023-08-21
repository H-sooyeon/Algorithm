#include <bits/stdc++.h>
using namespace std;
int test, arr[51][51] = {0, }, visited[51][51] = {0,};
int dy[] = { -1, 0, 1, 0 };
int dx[] = { 0, 1, 0, -1 };
int m, n, k, ret = 0;

void dfs(int y, int x) {
	visited[y][x] = 1;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
		if (!arr[ny][nx] || visited[ny][nx]) continue;
		
		dfs(ny, nx);
	};
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> test;

	int cabbage_x, cabbage_y;
	for (int i = 0; i < test; i++) {
		cin >> m >> n >> k;
		for (int j = 0; j < k; j++) {
			cin >> cabbage_x >> cabbage_y;
			arr[cabbage_y][cabbage_x] = 1;
		};

		for (int j = 0; j < n; j++) {
			for (int l = 0; l < m; l++) {
				if (arr[j][l] && !visited[j][l]) {
					ret++;
					dfs(j, l);
				};
			};
		};
		
		cout << ret << "\n";
		ret = 0;
		fill(&visited[0][0], &visited[n - 1][m], 0);
		fill(&arr[0][0], &arr[n - 1][m], 0);

	};

	return 0;
}