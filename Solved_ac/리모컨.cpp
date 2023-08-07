#include <iostream>
#include <string>
#include <math.h>
#include <algorithm>
#include <vector>
using namespace std;
string n;
vector<bool>mal(10, false);

bool check(int now) {
	string s = to_string(now);
	for (int i = 0; i < s.length(); i++) {
		if (mal[s[i] - 48]) {
			return false;
		}
	}
	return true;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int m;
	cin >> n >> m;

	int num_n = stoi(n);
	int tmp;
	for (int i = 0; i < m; i++) {
		cin >> tmp;
		mal[tmp] = true;
	}

	int mini = abs(num_n - 100);
	for (int i = 0; i < 1000000; i++) {
		if (check(i)) {
			int tmp = abs(num_n - i) + to_string(i).length();
			mini = min(mini, tmp);
		}
	}

	cout << mini << "\n";

	return 0;
}