#include <iostream>
using namespace std;
int n, m;
int arr[101];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;
	
	for (int i = 0; i < n; i++) {
		cin >> arr[i];
	}

	int max = 0;
	int value;
	for (int i = 0; i < n; i++) {
		for (int j = i+ 1; j < n; j++) {
			for (int k = j + 1; k < n; k++) {
				value = arr[i] + arr[j] + arr[k];
				if (value <= m)
					max = max < value ? value : max;
			}
		}
	}

	cout << max << "\n";

	return 0;
}