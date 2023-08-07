#include <iostream>
using namespace std;
int n, arr[101];
bool sosu[1001];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	std::fill_n(sosu, 1001, true);
	sosu[0] = false; sosu[1] = false;
	for (int i = 2; i * i <= 1000; i++) 
		for (int j = i * i; j <= 1000; j += i) sosu[j] = false;

	int count = 0;
	for (int i = 0; i < n; i++) {
		cin >> arr[i];

		if (sosu[arr[i]]) count++;
	}

	cout << count << "\n";

	return 0;
}