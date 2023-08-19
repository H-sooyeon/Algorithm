#include <bits/stdc++.h>
using namespace std;
int n, arr[101][101], visited[101][101];
int dy[] = { -1, 0, 1, 0 };
int dx[] = { 0, 1, 0, -1 };
int g = 0, s = 0;

void dfs(int y, int x, int color) {
	visited[y][x] = 1;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;

		if (arr[ny][nx] != color || visited[ny][nx]) continue;

		dfs(ny, nx, color);
	};
	return;
};

void dfs_s(int y, int x, int color) {
	visited[y][x] = 1;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;

		if ((arr[ny][nx] == 1 || arr[ny][nx] == 3) && color == 1 && !visited[ny][nx]) {
			dfs_s(ny, nx, 1);
		};
		if (arr[ny][nx] == 2 && color == 2 && !visited[ny][nx]) {
			dfs_s(ny, nx, 2);
		};
	};
};

int main() {
	ios_base::sync_with_stdio(false);
	cout.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	char input;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> input;
			if (input == 'R') arr[i][j] = 1;
			else if (input == 'B') arr[i][j] = 2;
			else arr[i][j] = 3;
		};
	};

	// 일반인
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			if (arr[i][j] == 1 && !visited[i][j]) {
				dfs(i, j, 1);
				g++;
			}
			else if (arr[i][j] == 2 && !visited[i][j]) {
				dfs(i, j, 2);
				g++;
			}
			else if (arr[i][j] == 3 && !visited[i][j]) {
				dfs(i, j, 3);
				g++;
			};
		}
	}

	// 적록색약
	fill(&visited[0][0], &visited[n-1][n], 0);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			if ((arr[i][j] == 1 || arr[i][j] == 3) && !visited[i][j]) {
				s++;
				dfs_s(i, j, 1);
			}
			else if (arr[i][j] == 2 && !visited[i][j]) {
				s++;
				dfs_s(i, j, 2);
			};
		};
	};

	cout << g << " " << s << "\n";

	return 0;
}