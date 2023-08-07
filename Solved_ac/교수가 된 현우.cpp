#include <iostream>
#include <math.h>
using namespace std;
int t;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> t;
	int value, cnt2 = 0, cnt5 = 0;;
	for (int i = 0; i < t; i++) {
		cin >> value;
		for (int j = 2; j <= value; j *= 2) {
			cnt2 += value / j;
		}
		for (int j = 5; j <= value; j *= 5) {
			cnt5 += value / j;
		}

		cout << min(cnt2, cnt5) << "\n";
		cnt2 = 0; cnt5 = 0;
	}

	return 0;
}