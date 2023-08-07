#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
int n;
bool days[10001];

bool compare(pair<int, int> p1, pair<int, int> p2) {
	return p1.first > p2.first;
}

int main() {
	ios_base::sync_with_stdio(false);
	cout.tie(NULL);
	cin.tie(NULL);

	cin >> n;
	vector<pair<int, int>> v;

	fill(days, days + 10001, false);

	int p, d;
	for (int i = 0; i < n; i++) {
		cin >> p >> d;

		v.push_back({ p, d });
	}

	sort(v.begin(), v.end(), compare);
	long long ret = 0;

	for (int i = 0; i < n; i++) {
		if (!days[v[i].second]) {
			ret += v[i].first;
			days[v[i].second] = true;
		}
		else {
			int pay;
			for (int j = v[i].second; j >= 1; j--) {
				pay = v[i].first;
				if (!days[j]) {
					ret += pay;
					days[j] = true;
					break;
				}
			}
		}
	}

	cout << ret << "\n";

	return 0;
}