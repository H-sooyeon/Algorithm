#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n;


int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	vector<int> v;
	int tmp, sum = 0;
	for (int i = 1; i < n; i++) {
		tmp = i;
		while (tmp != 0) {
			sum += tmp % 10;
			tmp /= 10;
		}
		if (i + sum == n) {
			v.push_back(i);
			break;
		}
		sum = 0;
	}

	if (v.size()) cout << v.at(0) << "\n";
	else cout << '0' << "\n";
	
	return 0;
}