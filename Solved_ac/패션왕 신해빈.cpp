#include <bits/stdc++.h>
#include <unordered_map>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	vector<string> key;
	unordered_map<string, int> map;

	int test, n;
	cin >> test;

	for (int i = 0; i < test; i++) {
		cin >> n;

		key.clear();
		map.clear();

		string head, value;
		for (int j = 0; j < n; j++) {
			cin >> value >> head;

			map[head]++;
			key.push_back(head);
		};

		sort(key.begin(), key.end());
		key.erase(unique(key.begin(), key.end()), key.end());

		int ret = 1;
		for (int j = 0; j < key.size(); j++) {
			ret *= (map[key.at(j)] + 1);
		};

		cout << ret - 1 << "\n";
	}

	return 0;
}