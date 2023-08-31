#include <bits/stdc++.h>
using namespace std;
int n, arr[20][20];

void go(int y, int x, int direction) {
	arr[y][x]++;

	if (direction == 0 || direction == 2) {
		if (x < n && arr[y][x + 1] != -1) 
			go(y, x + 1, 0);
	};
	if (direction == 1 || direction == 2) {
		if(y < n && arr[y+1][x] != -1)
			go(y + 1, x, 1);
	};

	if (x < n && y < n && arr[y + 1][x + 1] != -1 && arr[y + 1][x] != -1 && arr[y][x + 1] != -1)
		go(y + 1, x + 1, 2);
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	int input;
	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= n; j++) {
			cin >> input;
			if (input) arr[i][j] = -1;
			else arr[i][j] = 0;
		};
	};

	go(1, 2, 0);

	if (arr[n][n] == -1) arr[n][n] = 0;

	cout << arr[n][n] << "\n";

	return 0;
}