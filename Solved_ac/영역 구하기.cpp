#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int m, n, k, area = 0;
int left_x, left_y, right_x, right_y;
int a[101][101], visited[101][101];
int dy[4] = { -1, 0, 1, 0 };
int dx[4] = { 0, 1, 0, -1 };
vector<int> v;

int dfs(int y, int x) {
	visited[y][x] = 1;
	int ret = 1;
	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= m || nx < 0 || nx >= n) continue;
		if (visited[ny][nx]) continue;
		if (a[ny][nx]) continue;
		ret += dfs(ny, nx);
	}

	return ret;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);
	
	cin >> m >> n >> k;

	fill(&a[0][0], &a[0][0] + 101 * 101, 0);
	fill(&visited[0][0], &visited[0][0] + 101 * 101, 0);

	for (int i = 0; i < k; i++) {
		cin >> left_x >> left_y >> right_x >> right_y;

		if (right_x != 0) right_x -= 1;
		if (right_y != 0) right_y -= 1;

		for (int j = 0; j <= right_x - left_x; j++) {
			for (int k = 0; k <= right_y - left_y; k++) {
				a[left_y + k][left_x + j] = 1;
				visited[left_y + k][left_x + j] = 1;
			}
		}
	}

	int cnt = 0;
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			if (!a[i][j] && !visited[i][j]) {
				v.push_back(dfs(i, j));
				cnt++;

			}
		}
	}

	sort(v.begin(), v.end());
	
	cout << cnt << endl;
	for (int i = 0; i < v.size(); i++) {
		cout << v.at(i) << " ";
	}
	cout << endl;

	return 0;
}