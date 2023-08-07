#include <iostream>
using namespace std;
int n, k;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> k;

	long long first = 1;
	for (int i = n; i > n - k; i--) {
		first *= i;
	}
	
	for (int i = k; i > 0; i--) first /= i;

	cout << first << "\n";


	return 0;
}