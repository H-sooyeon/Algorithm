#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;
int r, c, ret = -1, visited[1001][1001], fstart[1001][1001];
int dy[4] = { -1, 0, 1, 0 };
int dx[4] = { 0, 1, 0, -1 };
char arr[1001][1001];
vector<pair<int, int>> J;
queue < pair<int, int>> q;

void f(int y, int x) {
	fstart[y][x] = 1;

	while (q.size()) {
		int y = q.front().first;
		int x = q.front().second;

		q.pop();

		for (int i = 0; i < 4; i++) {
			int ny = y + dy[i];
			int nx = x + dx[i];

			if (ny >= r || ny < 0 || nx >= c || nx < 0) continue;
			if (arr[ny][nx] == '#') continue;
			if (fstart[ny][nx] != 987654321) continue;

			fstart[ny][nx] = fstart[y][x] + 1;
			q.push({ ny, nx });
			
		}
	}
}

void bfs(int y, int x) {
	visited[y][x] = 1;
	queue<pair<int, int>> q;
	q.push({ y, x });

	while (q.size()) {
		int y = q.front().first;
		int x = q.front().second;

		q.pop();

		if (y == r - 1 || x == c - 1 || x == 0 || y == 0) {
			ret = visited[y][x];
			return;
		}
		for (int i = 0; i < 4; i++) {
			int ny = y + dy[i];
			int nx = x + dx[i];

			if (ny >= r || ny < 0 || nx >= c || nx < 0) continue;
			if (visited[ny][nx]) continue;
			if (arr[ny][nx] == '#') continue;
			if (fstart[ny][nx] <= visited[y][x] + 1) continue;
			
			visited[ny][nx] = visited[y][x] + 1;
			q.push({ ny, nx });
		}
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> r >> c;
	fill(&fstart[0][0], &fstart[0][0] + 1001 * 1001, 987654321);
	for (int i = 0; i < r; i++) {
		for (int j = 0; j < c; j++) {
			cin >> arr[i][j];

			if (arr[i][j] == 'J') {
				J.push_back({ i, j });
			}
			if (arr[i][j] == 'F') {
				q.push({ i,j });
				fstart[i][j] = 1;
			}
		}
	}

	memset(visited, 0, sizeof(visited));
	
	if (q.size()) {
		f(q.front().first, q.front().second);
	}
	bfs(J.at(0).first, J.at(0).second);

	if (ret != -1)
		cout << ret << "\n";
	else
		cout << "IMPOSSIBLE" << "\n";

	return 0;
}