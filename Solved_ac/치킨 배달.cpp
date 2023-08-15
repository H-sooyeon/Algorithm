#include <bits/stdc++.h>
using namespace std;
int n, m, street = 98764321;
vector<pair<int, int>> chicken, home;

void cal(vector<int> v) {
	int value = 0;

	for (int i = 0; i < home.size(); i++) {
		int _min = 987654321;
		for (int j = 0; j < m; j++) {
			int dist = abs(home.at(i).first - chicken.at(v.at(j)).first) + abs(home.at(i).second - chicken.at(v.at(j)).second);
			_min = min(dist, _min);
		};
		value += _min;
	};
	street = min(value, street);
};

void combi(int start, vector<int> v) {
	if (v.size() == m) {
		cal(v);
		return;
	};

	for (int i = start + 1; i < chicken.size(); i++) {
		v.push_back(i);
		combi(i, v);
		v.pop_back();
	};
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;

	int input;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> input;

			if (input == 2) {
				chicken.push_back({ i, j });
			};

			if (input == 1) {
				home.push_back({ i, j });
			};
		};
	};

	vector<int> v;
	combi(-1, v);

	cout << street << "\n";

	return 0;
}