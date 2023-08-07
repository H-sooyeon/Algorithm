#include <iostream>
#include <algorithm>
#include <math.h>
using namespace std;
int n, arr[1000001];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	arr[1] = 0;
	arr[2] = 1;
	arr[3] = 1;

	int ret3, ret2;
	for (int i = 4; i <= 1000000; i++) {
		arr[i] = arr[i - 1] + 1;
		int ret3 = 0, ret2 = 0;
		if (i % 3 == 0) {
			arr[i] = min(arr[i], arr[i/3] + 1);
			if (i % 6 == 0) ret3 = arr[i / 3] + 1;
		}
		if (i % 2 == 0) {
			arr[i] = min(arr[i], arr[i/2] + 1);
			if(i % 6 == 0) ret2 = arr[i / 2] + 1;
		}
		if (i % 6 == 0) {
			if (ret3 && ret2) {
				arr[i] = min(ret3, ret2);
			}
		}
	}

	cin >> n;

	cout << arr[n] << "\n";

	return 0;
}