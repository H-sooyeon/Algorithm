#include <iostream>
using namespace std;
int n, k, t;
int arr[15][15];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);
	
	for (int i = 1; i <= 14; i++) arr[0][i] = i;

	for (int i = 1; i <= 14; i++) {
		for (int j = 1; j <= 14; j++) {
			if (j == 1) arr[i][j] = 1;
			else {
				arr[i][j] = arr[i][j - 1] + arr[i-1][j];
			}
		}
	}

	cin >> t;
	for (int i = 0; i < t; i++) {
		cin >> k >> n;

		cout << arr[k][n] << "\n";
	}

	return 0;
}