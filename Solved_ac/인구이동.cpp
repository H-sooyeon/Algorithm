#include <iostream>
#include <vector>
#include <cstring>
#include <math.h>
using namespace std;
int n, l, r, arr[101][101], visited[101][101];
int dy[4] = { -1, 0, 1, 0 };
int dx[4] = { 0, 1, 0, -1 };
vector<pair<int, int>> v;
int sum = 0;

void dfs(int y, int x) {
	visited[y][x] = 1;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny >= n || ny < 0 || nx >= n || nx < 0) continue;
		if (visited[ny][nx]) continue;

		int tmp = abs(arr[y][x] - arr[ny][nx]);
		if (tmp < l || tmp > r) continue;

		v.push_back({ ny, nx });
		dfs(ny, nx);
		sum += arr[ny][nx];
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> l >> r;

	int cnt = 0;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> arr[i][j];
		}
	}

	bool flag = false;
	while (true) {
		memset(visited, 0, sizeof(visited));
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				if (!visited[i][j]) {
					sum = 0;
					v.clear();

					sum += arr[i][j];
					v.push_back({ i, j });
					dfs(i, j);

					if (v.size() > 1) {
						int avg = sum / v.size();
						for (int k = 0; k < v.size(); k++) {
							arr[v.at(k).first][v.at(k).second] = avg;
						}
						flag = true;
					}
				}
			}
		}
		if (flag) {
			flag = false;
			cnt++;
		}
		else break;
	}


	cout <<  cnt << "\n";


	return 0;
}