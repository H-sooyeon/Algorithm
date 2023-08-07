#include <iostream>
#include <algorithm>
using namespace std;
int n;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	int two = 0, five = 0;
	bool flag = true;

		for (int i = 1; i <= n; i++) {
			int tmp = i;
			bool flag = true;

			while (flag) {
				flag = false;
				if (tmp % 2 == 0) {
					two++;
					tmp /= 2;
					flag = true;
				}
				if (tmp % 5 == 0) {
					five++;
					tmp /= 5;
					flag = true;
				}
			}
		}

		int ret = min(two, five);
		cout << ret << "\n";


	return 0;
}