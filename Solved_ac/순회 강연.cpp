#include <bits/stdc++.h>
using namespace std;
int n, arr[10004] = { 0, };

bool compare(pair<int, int> a, pair<int, int> b) {
	return a.second > b.second;
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	vector<pair<int, int>> v;
	int p, d;
	for (int i = 0; i < n; i++) {
		cin >> p >> d;

		v.push_back({ d, p });
	};

	sort(v.begin(), v.end(), compare);

	for (int i = 0; i < v.size(); i++) {
		if (arr[v.at(i).first]) {
			for (int j = v.at(i).first; j >= 1; j--) {
				if (!arr[j]) {
					arr[j] = v.at(i).second;
					break;
				};
			};
		}
		else {
			arr[v.at(i).first] = v.at(i).second;
		};
	};

	int ret = 0;
	for (int i = 0; i < 10004; i++) {
		ret += arr[i];
	};

	cout << ret << "\n";

	return 0;
};