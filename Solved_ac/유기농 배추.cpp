#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;
int t, n, m, k;
int arr[51][51], visited[51][51], x, y;
int dy[4] = { -1,0,1,0 };
int dx[4] = { 0,1,0,-1 };
int cou;

void go(int y, int x) {
	visited[y][x] = 1;
	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
		if (arr[ny][nx] == 1 && !visited[ny][nx]) {
			go(ny, nx);
		}

	}
	return;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> t;

	while (t) {
		cin >> m >> n >> k;
		cou = 0;
		fill(&arr[0][0], &arr[0][0] + 51 * 51, 0);
		fill(&visited[0][0], &visited[0][0] + 51 * 51, 0);

		for (int i = 0; i < k; i++) {
			cin >> x >> y;
			arr[y][x] = 1;
		}
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if (arr[i][j] == 1 && !visited[i][j]) {
					go(i, j);
					cou++;
				}
			}
		}

		cout << cou << endl;
		t--;
	}




	return 0;
}