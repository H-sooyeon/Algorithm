#include <iostream>
#include <math.h>
using namespace std;
int n, arr[101][101], visited[101][101], cnt;
int dy[4] = { -1, 0, 1, 0 };
int dx[4] = { 0,1,0,-1 };

void dfs(int y, int x, int d) {
	visited[y][x] = 1;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
		if (arr[ny][nx] <= d) continue;
		if (visited[ny][nx]) continue;

		dfs(ny, nx, d);
	}

	return;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> arr[i][j];
		}
	}

	int result = 1;
	for (int d = 1; d <= 100; d++) {
		fill(&visited[0][0], &visited[0][0] + 101 * 101, 0);
		cnt = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				if (arr[i][j] > d && !visited[i][j]) {
					dfs(i, j, d);
					cnt++;
				}
			}
		}
		result = max(result, cnt);
	}

	cout << result << endl;

	return 0;
}