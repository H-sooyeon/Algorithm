#include <iostream>
#include <vector>
using namespace std;
int n, m, cnt = 0, result = 0, pre;
int arr[101][101], visited[101][101];
int dy[4] = { -1, 0, 1, 0 };
int dx[4] = { 0, 1, 0, -1 };

void dfs(int y, int x) {
	visited[y][x] = 1;
	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny >= n || ny < 0 || nx >= m || nx < 0) continue;

		if (visited[ny][nx] == 0 && arr[ny][nx] == 1) {
			arr[ny][nx] = 0;
			visited[ny][nx] = 1;
			result--;
			continue;
		}

		if (visited[ny][nx]) continue;
		dfs(ny, nx);
	}
	return;
}

void solve() {
	bool flag = false;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if (!visited[i][j] && arr[i][j] == 0) {
					pre = result;
					dfs(i, j);
					cnt++;

					fill(&visited[0][0], &visited[0][0] + 100 * 100, 0);

					if (result <= 0) {
						flag = true;
						break;
					}
				}
			}
			if (flag) break;
		}
	}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;
	fill(&visited[0][0], &visited[0][0] + 100 * 100, 0);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			cin >> arr[i][j];

			if (arr[i][j] == 1) result++;
		}
	}

	solve();

	cout << cnt << endl;
	cout << pre << endl;

	return 0;
}