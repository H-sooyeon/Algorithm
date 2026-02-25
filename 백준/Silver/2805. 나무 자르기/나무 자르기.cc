#include <iostream>
#include <math.h>
#include <algorithm>
using namespace std;
int n, m, maxv, pre, res;
int arr[1000001];

int find() {
	int start = 1;
	int end = maxv;

	while (start <= end) {
		int mid = (start + end) / 2;

		long long sum = 0;
		for (int i = 0; i < n; i++) {
			if (arr[i] - mid <= 0) {
				sum += 0;
			}
			else sum += (arr[i] - mid);
		}

		if (sum >= m) {
			start = mid + 1;
			res = mid;
		}
		else {
			end = mid - 1;
		}
	}

	return res;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;
	maxv = 0;
	for (int i = 0; i < n; i++) {
		cin >> arr[i];

		maxv = maxv < arr[i] ? arr[i] : maxv;
	}

	int result = find();

	cout << result << "\n";


	return 0;
}