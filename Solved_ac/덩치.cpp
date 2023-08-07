#include <iostream>
#include <vector>
#include <math.h>
#include <algorithm>
using namespace std;
int n;
vector<pair<int, int>> v;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	int height, weight;
	for (int i = 0; i < n; i++) {
		cin >> weight >> height;
		v.push_back({ weight, height });
	}

	vector<int> ret;
	int inh, inw;
	for (int i = 0; i < n; i++) {
		inw = v.at(i).first;
		inh = v.at(i).second;
		
		int cnt = 1;
		for (int j = 0; j < n; j++) {
			if (i == j) continue;
			if (inw > v.at(j).first && inh > v.at(j).second) continue;
			else if (inw < v.at(j).first && inh < v.at(j).second) {
				cnt++;
			}
		}
		ret.push_back(cnt);
	}

	for (int i = 0; i < n; i++) {
		cout << ret.at(i) << " ";
	}
	

	cout << "\n";

	return 0;
}