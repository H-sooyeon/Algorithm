#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <utility>
using namespace std;

bool compare(pair<string, int> p1, pair<string, int> p2) {
	return p1.second < p2.second;
}

int main() {

	int n;
	vector<pair<string, int>> arr;
	vector<string> v;
	cin >> n;

	for (int i = 0; i < n; i++) {
		string tmp;
		cin >> tmp;
		
		v.push_back(tmp);
	}

	stable_sort(v.begin(), v.end());
	v.erase(unique(v.begin(), v.end()), v.end());

	for (int i = 0; i < v.size(); i++) {
		arr.push_back(make_pair(v[i], v[i].size()));
	}
	
	stable_sort(arr.begin(), arr.end(), compare);

	for (int i = 0; i < arr.size(); i++) {
		cout << arr[i].first << endl;
	}

	return 0;
}