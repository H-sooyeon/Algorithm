#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n, x, y;

bool compare(pair<int, int> p1, pair<int, int> p2) {
	if (p1.first == p2.first) return p1.second < p2.second;
	else return p1.first < p2.first;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	vector<pair<int, int>> v;
	for (int i = 0; i < n; i++) {
		cin >> x >> y;

		v.push_back({ x,y });
	}

	sort(v.begin(), v.end(), compare);

	for (int i = 0; i < n; i++) {
		cout << v.at(i).first << " " << v.at(i).second << "\n";
	}

	return 0;
}