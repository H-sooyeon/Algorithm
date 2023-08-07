#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
int n;
vector<pair<int, int>> v;

bool compare(pair<int, int> p1, pair<int, int> p2) {
	if (p1.second == p2.second) return p1.first < p2.first;
	return p1.second < p2.second;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	int x, y;
	for (int i = 0; i < n; i++) {
		cin >> x >> y;

		v.push_back({ x, y });
	}

	sort(v.begin(), v.end(), compare);

	for (int i = 0; i < n; i++) cout << v.at(i).first << " " << v.at(i).second << "\n";

	return 0;
}