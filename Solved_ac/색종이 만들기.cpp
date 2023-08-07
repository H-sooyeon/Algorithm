#include <iostream>
using namespace std;
int n, arr[129][129], white = 0, blue = 0;
// [y][x]
void divide_q(int x, int y, int size) {
	int sum = 0;
	for (int i = y; i < y + size; i++) {
		for (int j = x; j < x + size; j++) {
			sum += arr[i][j];
		}
	}

	if (sum == 0) {
		white++;
		return;
	}
	else {
		if (size == 1) {
			blue++;
			return;
		}
	}
	
	if (sum != size * size) {
		int innerSize = size / 2;
		divide_q(x + innerSize, y, innerSize);	// 1사분면
		divide_q(x, y, innerSize);				// 2사분면
		divide_q(x, y + innerSize, innerSize);	// 3사분면
		divide_q(x + innerSize, y + innerSize, innerSize); // 4사분면
	}
	else blue++;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> arr[i][j];
		}
	}

	divide_q(0, 0, n);
	cout << white << "\n" << blue << "\n";

	return 0;
}