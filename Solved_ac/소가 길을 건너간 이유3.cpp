#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n;

bool compare(pair<int, int> p1, pair<int, int> p2) {
	if (p1.first == p2.first) return p1.second < p2.second;
	return p1.first < p2.first;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	vector<pair<int, int>> v;
	int cow_arri, check_time;

	for (int i = 0; i < n; i++) {
		cin >> cow_arri >> check_time;

		v.push_back({ cow_arri, check_time });
	}

	sort(v.begin(), v.end(), compare);

	int time = v[0].first + v[0].second;

	for (int i = 1; i < n; i++) {
		if (time > v[i].first) {
			time += v[i].second;
		}
		else {
			time = v[i].first + v[i].second;
		}
	}

	cout << time << "\n";

	return 0;
}