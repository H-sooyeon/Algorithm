#include <bits/stdc++.h>
using namespace std;
int n, m, arr[100001];
int max_value = 0, sum = 0;

int go() {
	int hi = sum, low = max_value;

	while (hi >= low) {
		int mid = (hi + low) / 2;
		int cnt = 1, pay = mid;

		for (int i = 0; i < n; i++) {
			if (pay >= arr[i]) {
				pay -= arr[i];
			}
			else {
				cnt++;
				pay = mid;
				if (pay >= arr[i]) {
					pay -= arr[i];
				}
				else {
					break;
					cnt = 0;
				}
			}
		}

		if (cnt > m) low = mid + 1;
		else if (cnt <= m) hi = mid - 1;
	}

	return low;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;

	for (int i = 0; i < n; i++) {
		cin >> arr[i];

		max_value = max(arr[i], max_value);
		sum += arr[i];
	};

	int ret = go();

	cout << ret << "\n";


	return 0;
}