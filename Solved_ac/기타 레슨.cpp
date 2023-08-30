#include <bits/stdc++.h>
using namespace std;
int n, m, arr[100001], sum = 0;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;
	int low = 0;
	for (int i = 0; i < n; i++) {
		cin >> arr[i];
		sum += arr[i];
		low = max(low, arr[i]);
	};

	int min_val = 987654321, high = sum;
	while (low <= high) {
		int mid = (low + high) / 2;

		int cnt = 1, laysum = 0;
		for (int i = 0; i < n; i++) {
			if (mid < arr[i]) {
				break;
			}

			if (laysum + arr[i] > mid) {
				cnt++;
				laysum = arr[i];
			}
			else laysum += arr[i];
		};

		if (cnt > m) {
			low = mid + 1;
		}
		else {
			high = mid - 1;
			min_val = min(min_val, mid);
		}
	};

	cout << min_val << "\n";


	return 0;
}