#include <iostream>
using namespace std;
int n;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	int cnt = 1;
	int value, pre_value;
	pre_value = 1;

	if (n == 1) {
		cout << cnt << endl;
		return 0;
	}

	while (true) {
		value = pre_value + cnt * 6;
		if (value >= n && pre_value < n) {
			cnt++;
			cout << cnt << endl;
			break;
		}
		cnt++;
		pre_value = value;
	}

	return 0;
}