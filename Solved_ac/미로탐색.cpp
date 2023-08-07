#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <queue>
#include <tuple>
using namespace std;
int n, m;
int arr[102][102], visited[102][102], y, x;
int dy[4] = { -1,0,1,0 };
int dx[4] = { 0,1,0,-1 };

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	scanf("%d %d", &n, &m);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			scanf("%1d", &arr[i][j]);
		}
	}

	queue<pair<int, int>> q;
	visited[0][0] = 1;
	q.push({ 0,0 });

	while (q.size()) {
		tie(y, x) = q.front(); 
		q.pop();
		for (int i = 0; i < 4; i++) {
			int ny = y + dy[i];
			int nx = x + dx[i];

			if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
			if (arr[ny][nx] == 0) continue;
			if (visited[ny][nx]) continue;

			visited[ny][nx] = visited[y][x] + 1;
			q.push({ ny, nx });
		}
	}

	cout << visited[n - 1][m - 1] << "\n";

	return 0;
}