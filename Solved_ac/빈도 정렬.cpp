#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
int n, c, arr[1001];

bool compare(pair<int, int> a, pair<int, int> b) {
	return a.second > b.second;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> c;

	for (int i = 0; i < n; i++) {
		cin >> arr[i];
	}

	vector<pair<int, int>> v;
	int value = arr[0];
	bool flag = false;
	for (int i = 1; i <= n; i++) {
		vector<pair<int, int>> ::iterator iter;
		for (iter = v.begin(); iter != v.end(); iter++) {
			if (iter->first == value) {
				iter->second++;
				flag = true;
				break;
			}
		}

		if (!flag) {
			v.push_back(make_pair(value , 1));
		}
		flag = false;
		value = arr[i];
	}

	stable_sort(v.begin(), v.end(), compare);

	for (int i = 0; i < v.size(); i++) {
		for (int j = 0; j < v[i].second; j++) {
			cout << v[i].first << " ";
		}
	}
	cout << endl;

	return 0;
}