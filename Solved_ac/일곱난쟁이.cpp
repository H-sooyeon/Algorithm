#include <iostream>
#include <bits/stdc++.h>
using namespace std;
vector<int> height;

void print(vector<int> v) {
	int sum = 0;
	vector<int> result;
	for (int i = 0; i < v.size(); i++) {
		sum += height.at(v.at(i));
		result.push_back(height.at(v.at(i)));
	};

	if (sum == 100) {
		sort(result.begin(), result.end());
		for (int i = 0; i < result.size(); i++) {
			cout << result.at(i) << "\n";
		};
		exit(0);
	};
};

void combi(int start, vector<int> v) {
	if (v.size() == 7) {
		print(v);
		return;
	};

	for (int i = start + 1; i < 9; i++) {
		v.push_back(i);
		combi(i, v);
		v.pop_back();
	};
	return;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int key;
	for (int i = 0; i < 9; i++) {
		cin >> key;
		height.push_back(key);
	};

	vector<int> v;
	combi(-1, v);

	return 0;
}