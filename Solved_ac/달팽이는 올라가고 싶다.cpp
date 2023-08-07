#include <iostream>
#include <math.h>
using namespace std;
long long a, b, v;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> a >> b >> v;

	double tmp = v - a;
	long long result = ceil(tmp / (a - b)) + 1;
	cout << result << "\n";

	return 0;
}