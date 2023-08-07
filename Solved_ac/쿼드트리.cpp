#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <vector>
#include <string>
using namespace std;
int n;
char arr[65][65];

string go(int y, int x, int size) {
	if (size == 1) return string(1, arr[y][x]);

	char c = arr[y][x];
	string ret = "";
	for (int i = y; i < y + size; i++) {
		for (int j = x; j < x + size; j++) {
			if (c != arr[i][j]) {
				ret += "(";
				ret += go(y, x, size / 2);
				ret += go(y, x + size / 2, size / 2);
				ret += go(y + size / 2, x, size / 2);
				ret += go(y + size / 2, x + size / 2, size / 2);
				ret += ")";
				return ret;
			}
		}
	}

	return string(1, c);
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

	string result = go(0, 0, n);
	cout << result << endl;

	return 0;
}