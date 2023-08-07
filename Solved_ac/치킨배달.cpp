#include <iostream>
#include <math.h>
#include <algorithm>
#include <vector>
using namespace std;
int n, m, ret = 987654321;
int arr[51][51];
vector<pair<int, int>> home, chicken;
vector<vector<int>> chickenList;

void combi(int start, vector<int> v) {
	if (v.size() == m) {
		chickenList.push_back(v);
		return;
	}

	for (int i = start + 1; i < chicken.size(); i++) {
		v.push_back(i);
		combi(i, v);
		v.pop_back();
	}

	return;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;

	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> arr[i][j];

			if (arr[i][j] == 2) {
				chicken.push_back({ i, j });
			}
			else if (arr[i][j] == 1) {
				home.push_back({ i, j });
			}
		}
	}

	vector<int> v;
	combi(-1, v);

	vector<int> tmp;
	for (int i = 0; i < chickenList.size(); i++) {
		tmp = chickenList.at(i);
		int sum = 0;
		for (int j = 0; j < home.size(); j++) {
			int _min = 987654321;
			for (int k = 0; k < tmp.size(); k++) {
				int dist = (abs(chicken.at(tmp[k]).first - home.at(j).first) + abs(chicken.at(tmp[k]).second - home.at(j).second));
				_min = min(dist, _min);
			}
			sum += _min;
		}
		ret = min(sum, ret);
	}

	cout << ret << "\n";

	return 0;
}