#include <iostream>
using namespace std;

int gcd(int a, int b) {
	int mod = a % b;

	while (mod > 0) {
		a = b;
		b = mod;
		mod = a % b;
	}
	return b;
}

int lcm(int a, int b, int res1) {
	return a * b / res1;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int a, b;
	cin >> a >> b;

	int max, min;
	if (a > b) max = a, min = b;
	else max = b, min = a;

	int result1 = gcd(max, min);
	int result2 = lcm(max, min, result1);

	cout << result1 << "\n";
	cout << result2 << "\n";

	return 0;
}