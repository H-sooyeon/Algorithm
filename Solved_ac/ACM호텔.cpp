#include <iostream>
using namespace std;
int h, w, n;
int arr[100][100];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int t, result = 0;
	cin >> t;
	for (int i = 0; i < t; i++) {
		cin >> h >> w >> n;

		for (int j = 1; j <= w; j++) {
			for (int k = 1; k <= h; k++) {
				n--;
				if (n == 0) {
					result = k * 100 + j;
					break;
				}
			}
		}
		cout << result << "\n";
	}


	return 0;
}