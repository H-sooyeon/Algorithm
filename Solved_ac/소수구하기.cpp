#include <iostream>
#include <math.h>
using namespace std;
int m, n;
bool arr[1000001];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> m >> n;

	std::fill_n(arr, n + 1, true);
	arr[0] = false;
	arr[1] = false;

	for (int i = 2; i * i <= n; i++) {
		for (int j = i * i; j <= n; j += i) {
			arr[j] = false;
		}
	}

	for (int i = m; i <= n; i++) {
		if (arr[i] == true) {
			printf("%d\n", i);
		}
	}

	return 0;
}