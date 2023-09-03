#include <bits/stdc++.h>
using namespace std;
int n, l, r, arr[51][51], visited[51][51] = { 0, };
int ret = 0, sum = 0, dif;
int dy[] = { -1, 0, 1, 0 };
int dx[] = { 0, 1, 0, -1 };
vector<pair<int, int>> city_di;

void dfs(int y, int x) {
	visited[y][x] = 1;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
		if (visited[ny][nx]) continue;

		int tmp = arr[y][x] - arr[ny][nx];
		if (abs(tmp) < l || abs(tmp) > r) continue;

		city_di.push_back({ ny, nx });
		sum += arr[ny][nx];
		dfs(ny, nx);
	};
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> l >> r;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> arr[i][j];
		};
	};

	bool flag = false;

	while (true) {
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				if (!visited[i][j]) {
					city_di.clear();
					sum = 0;

					sum += arr[i][j];
					city_di.push_back({ i, j });
					dfs(i, j);
				}
				if (sum != arr[i][j]) {
					int temp = sum / city_di.size();
					for (int k = 0; k < city_di.size(); k++) {
						arr[city_di.at(k).first][city_di.at(k).second] = temp;
					};
					flag = true;
				}
			};
		};

		if (!flag) break;

		flag = false;
		ret++;
		memset(visited, 0, sizeof(visited));
	};

	cout << ret << "\n";

	return 0;
}