#include <bits/stdc++.h>
using namespace std;
int n, k, cnt = 0;

bool compare(int a, int b) {
	return b < a;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> k;
	
	int value;
	vector<int> v;
	for (int i = 0; i < n; i++) {
		cin >> value;

		v.push_back(value);
	}

	sort(v.begin(), v.end(), compare);

	while (k > 0) {
		for (int i = 0; i < v.size(); i++) {
			if (k % v.at(i) == 0) {
				k -= v.at(i);
				cnt++;
				break;
			};
		};
	};

	cout << cnt << "\n";

	return 0;
}