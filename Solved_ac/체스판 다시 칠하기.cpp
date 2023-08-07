#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <string>
#include <algorithm>
#include <utility>
#include <math.h>
using namespace std;

string A[50];

string WB[8] = {
	"WBWBWBWB",
	"BWBWBWBW",
	"WBWBWBWB",
	"BWBWBWBW",
	"WBWBWBWB",
	"BWBWBWBW",
	"WBWBWBWB",
	"BWBWBWBW"
};

string BW[8] = {
	"BWBWBWBW",
	"WBWBWBWB",
	"BWBWBWBW",
	"WBWBWBWB",
	"BWBWBWBW",
	"WBWBWBWB",
	"BWBWBWBW",
	"WBWBWBWB"
};

int WB_cnt(int x, int y) {
	int cnt = 0;
	for (int i = 0; i < 8; i++) {
		for (int j = 0; j < 8; j++) {
			if (A[i+x][j+y] != WB[i][j]) {
				cnt++;
			}
		}
	}
	return cnt;
}

int BW_cnt(int x, int y) {
	int cnt = 0;
	for (int i = 0; i < 8; i++) {
		for (int j = 0; j < 8; j++) {
			if (A[i+x][j+y] != BW[i][j]) {
				cnt++;
			}
		}
	}
	return cnt;
}

int main() {

	int m, n, min_val = 10000;
	cin >> m >> n;

	for (int i = 0; i < m; i++) {
		cin >> A[i];
	}

	for (int i = 0; i <= m - 8; i++) {
		for (int j = 0; j <= n - 8; j++) {

			int tmp = min(WB_cnt(i, j), BW_cnt(i, j));

			if (tmp < min_val)
				min_val = tmp;
		}
	}
	cout << min_val << endl;

	return 0;
}