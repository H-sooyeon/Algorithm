#include <bits/stdc++.h>
#include <unordered_map>
using namespace std;
int test, n;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	unordered_map<string, vector<string>> map;

	cin >> test;
	string key, value;
	for (int i = 0; i < test; i++) {
		cin >> n;
		for (int j = 0; j < n; j++) {
			cin >> value >> key;

			if (auto iter = map.find(key) == map.end()) {
				vector<string> v;
				v.push_back(value);
				map.insert({ key, v });
			}
			else {
				map[key].push_back(value);
			}

			// °è»ê
			for (int j = 0; j < map.size(); j++) {

			}
		}
		map.clear();
	};

	return 0;
}