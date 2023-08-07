#include <iostream>
#include <vector>
#include <math.h>
using namespace std;
int n, m;
int arr[10][10], visited[10][10];
int dy[4] = { -1, 0, 1, 0 };
int dx[4] = { 0, 1, 0, -1 };
vector<pair<int, int>> virusList;
vector<pair<int,int>> wallList;

void dfs(int y, int x) {
	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny >= n || ny < 0 || nx >= m || nx < 0) continue;
		if (visited[ny][nx] || arr[ny][nx] == 1) continue;

		visited[ny][nx] = 1;
		dfs(ny, nx);
	}
	return;
}

int solve() {
	fill(&visited[0][0], &visited[0][0] + 10 * 10, 0);
	for (pair<int, int> a : virusList) {
		visited[a.first][a.second] = 1;
		dfs(a.first, a.second);
	}

	int cnt = 0;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			if (arr[i][j] == 0 && !visited[i][j]) cnt++;
		}
	}

	return cnt;
}


int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;
	int result = 0;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			cin >> arr[i][j];
			
			if (arr[i][j] == 2) virusList.push_back({ i, j });
			else if (arr[i][j] == 0) wallList.push_back({ i, j });
		}
	}

	for (int i = 0; i < wallList.size(); i++) {
		for (int j = i + 1; j < wallList.size(); j++) {
			for (int k = j + 1; k < wallList.size(); k++) {
				arr[wallList[i].first][wallList[i].second] = 1;
				arr[wallList[j].first][wallList[j].second] = 1;
				arr[wallList[k].first][wallList[k].second] = 1;

				result = max(result, solve());

				arr[wallList[i].first][wallList[i].second] = 0;
				arr[wallList[j].first][wallList[j].second] = 0;
				arr[wallList[k].first][wallList[k].second] = 0;
			}
		}
	}

	cout << result << "\n";

	return 0;
}