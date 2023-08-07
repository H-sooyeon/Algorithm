#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n;

bool compare(pair<int, int> p1, pair<int, int> p2) {
	if (p1.second == p2.second) return p1.first < p2.first;
	return p1.second < p2.second;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	vector<pair<int, int>> v;
	int team, team_time;
	for (int i = 0; i < n; i++) {
		cin >> team >> team_time;

		v.push_back({ team, team_time });
	}

	sort(v.begin(), v.end(), compare);

	int cnt = 1;
	int time = v[0].second;
	for (int i = 1; i < n; i++) {
		if (time > v[i].first) continue;

		time = v[i].second;
		cnt++;
	}

	cout << cnt << "\n";

	return 0;
}