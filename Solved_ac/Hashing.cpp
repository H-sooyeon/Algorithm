#include <iostream>
#include <string>
#include <math.h>
#include <algorithm>
using namespace std;
int r = 31, n;
long long m = 1234567891;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	string str;

	cin >> str;

	long long ret = 0;
	long long tmp = 1;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < i; j++) {
			tmp *= r;
			tmp %= m;
		}
		tmp *= (str[i] - 96);
		ret += tmp;
		ret %= m;
		tmp = 1;
	}

	ret = ret % m;
	cout << ret << "\n";

	return 0;
}