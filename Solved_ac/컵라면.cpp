#include <bits/stdc++.h>
using namespace std;
int n, arr[200001] = { 0, };
priority_queue<int, vector<int> ,greater<int>> p;
vector<pair<int, int>> v;

bool compare(pair<int, int> p1, pair<int, int> p2) {
	if (p1.first == p2.first) {
		return p1.second > p2.second;
	}
	else {
		return p1.first < p2.first;
	};
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	int a, b;
	for (int i = 0; i < n; i++) {
		cin >> a >> b;
		v.push_back({ a, b });
	};

	sort(v.begin(), v.end(), compare);

	p.push(v[0].second);

	for (int i = 1; i < n; i++) {
		if (p.size() < v[i].first) {
			p.push(v[i].second);
		}
		else {
			if (p.top() < v[i].second) {
				p.pop();
				p.push(v[i].second);
			};
		};
	};

	int ret = 0;
	while (!p.empty()) {
		ret += p.top();
		p.pop();
	};
	
	cout << ret << "\n";

	return 0;
}