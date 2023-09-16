#include <bits/stdc++.h>
using namespace std;
int m, n, k, arr[101][101] = {0,}, visited[101][101] = {0,};
int dy[] = {-1, 0, 1, 0};
int dx[] = {0, 1, 0, -1};
int ret = 0, cnt = 0;
vector<int> v;

void dfs(int y, int x) {
	visited[y][x] = 1;
	cnt++;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= m || nx < 0 || nx >= n) continue;
		if (arr[ny][nx] || visited[ny][nx]) continue;

		dfs(ny, nx);
	}

	return;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> m >> n >> k;

	int left_x, left_y, right_x, right_y;
	for (int i = 0; i < k; i++) {
		cin >> left_x >> left_y >> right_x >> right_y;

		for (int k = left_y; k < right_y; k++) {
			for (int j = left_x; j < right_x; j++) {
				arr[k][j] = 1;
			}
		}
	}

	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			if (!arr[i][j] && !visited[i][j]) {
				ret++;
				dfs(i, j);

				v.push_back(cnt);
				cnt = 0;
			}
		}
	}

	sort(v.begin(), v.end());

	cout << ret << "\n";
	for (int i = 0; i < v.size(); i++) {
		cout << v[i] << " ";
	};

	cout << "\n";

	return 0;
}