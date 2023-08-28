#include <bits/stdc++.h>
using namespace std;
int n, m, arr[51][51], visited[51][51] = { 0, }, result = 0;
int dy[] = {-1, 0, 1, 0};
int dx[] = {0, 1, 0, -1};
vector<pair<int, int>> land;


int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;
	char input;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			cin >> input;
			if (input == 'L') {
				arr[i][j] = 1;
				land.push_back({ i, j });
			}
			else arr[i][j] = 0;
		};
	};

	for (int k = 0; k < land.size(); k++) {
		memset(visited, 0, sizeof(visited));

		queue <pair<int, int>> q;
		int land_max = 0;
		q.push(land.at(k));
		visited[land.at(k).first][land.at(k).second] = 1;

		while (q.size()) {
			int y, x;
			tie(y, x) = q.front();
			q.pop();

			for (int i = 0; i < 4; i++) {
				int ny = y + dy[i];
				int nx = x + dx[i];

				if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
				if (!arr[ny][nx] || visited[ny][nx]) continue;

				q.push({ ny, nx });
				visited[ny][nx] = visited[y][x] + 1;
				land_max = max(land_max, visited[ny][nx]);
			};
		};

		result = max(result, land_max);
	};

	cout << result - 1 << "\n";

	return 0;
}