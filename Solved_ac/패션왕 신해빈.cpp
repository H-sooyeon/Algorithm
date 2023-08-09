#include <bits/stdc++.h>
using namespace std;
int test, n, mapSize, k=0, result = 0;
vector<string> v;

void print(vector<pair<int, string>> b, multimap<string, string> map) {
	int multi = 1;
	for (int i = v.size(); i >= k; i--) {
		multi *= i;
	};

	for (int i = k; i > 0; i--) {
		multi /= i;
	};

	multimap<string, string>::iterator mit;
	mit = map.begin();
	for (int i = 0; i < b.size(); i++) {
		mit++;
		multi *= map.count(b[i].second);
	};

	result += multi;
}

void combi(int start, vector<pair<int, string>> b, multimap<string, string> map) {
	if (b.size() == k) {
		print(b, map); // 전체 map에서 뽑고자 하는 index 벡터
		return;
	};

	for (int i = start + 1; i < v.size(); i++) {
		b.push_back({ i, v[i] });
		combi(i, b, map);
		b.pop_back();
	};
	return;
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);


	cin >> test;
	for (int i = 0; i < test; i++) {
		cin >> n;

		string key, value;
		multimap<string, string> map;
		v.clear();

		for (int j = 0; j < n; j++) {
			cin >> value >> key;
			map.insert({ key, value });
			v.push_back(key);
		};

		sort(v.begin(), v.end());
		v.erase(unique(v.begin(), v.end()), v.end());

		mapSize = map.size();

		vector<pair<int, string>> b;
		k = 2;
		for (int j = 1; j < v.size(); j++) {
			combi(-1, b, map);
			k++;
		};
		cout << result + mapSize << "\n";
		result = 0;
	};


	return 0;
}