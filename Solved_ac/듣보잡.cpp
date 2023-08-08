#include <iostream>
#include <unordered_map>
#include <vector>
#include <algorithm>
using namespace std;
int n, m;


int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;

	unordered_map<string, int> h1;
	string str;
	for (int i = 0; i < n; i++) {
		cin >> str;
		h1.insert({ str, 1 });
	};

	vector<string> v;
	for (int i = 0; i < m; i++) {
		cin >> str;
		if (h1.find(str) != h1.end()) {
			v.push_back(str);
		};
	};

	sort(v.begin(), v.end());

	cout << v.size() << "\n";
	for (int i = 0; i < v.size(); i++) {
		cout << v.at(i) << "\n";
	};


	return 0;
}