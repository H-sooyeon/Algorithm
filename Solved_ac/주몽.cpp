#include <iostream>
#include <algorithm>
using namespace std;
int arr[15001];
int n, m;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);
	cin >> n >> m;

	for (int i = 0; i < n; i++) {
		cin >> arr[i];
	}

	if (m > 200000) cout << 0 << endl;
	else {
		int count = 0;
		for (int i = 0; i < n; i++) {
			for (int j = i + 1; j < n; j++) {
				if (arr[i] + arr[j] == m)
					count++;
			}
		}
		cout << count << endl;
	}

	return 0;
}