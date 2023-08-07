#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n, age;
string name;

bool compare(pair<int, string> p1, pair<int, string> p2) {
	return p1.first < p2.first;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	vector<pair<int, string>> v;

	for (int i = 0; i < n; i++) {
		cin >> age >> name;
		
		v.push_back({ age, name });
	}

	stable_sort(v.begin(), v.end(), compare);

	for (int i = 0; i < n; i++) {
		cout << v[i].first << " " << v[i].second << "\n";
	}

	return 0;
}