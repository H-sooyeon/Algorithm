#include <bits/stdc++.h>
using namespace std;
int n, dan, ji, tansu, vita, result = 987654321;
vector<vector<int>> vv;

bool compare(vector<int> a, vector<int> b) {
	int aSize = a.size(), bSize = b.size();
	for (int i = 0; i < min(aSize, bSize); i++) {
		if (a.at(i) > b.at(i)) {
			return true;
		}
		else if (a.at(i) < b.at(i)) {
			return false;
		}
	};

	if (aSize > bSize) return true;

	return false;
};

int main() {
	
	cin >> n;

	cin >> dan >> ji >> tansu >> vita;

	int nutri1, nutri2, nutri3, nutri4, money;
	for (int i = 0; i < n; i++) {
		cin >> nutri1 >> nutri2 >> nutri3 >> nutri4 >> money;

		vv.push_back({ nutri1, nutri2, nutri3, nutri4, money });
	};

	vector<vector<int>> v;
	vector<int> list;
	for (int i = 0; i < (1 << n); i++) {
		int vi1 = 0, vi2 = 0, vi3 = 0, vi4 = 0, pay = 0;
		vector<int> fortemp;

		for (int j = 0; j < n; j++) {
			if (i & (1 << j)) {
				vector<int> temp = vv.at(j);
				vi1 += temp.at(0);
				vi2 += temp.at(1);
				vi3 += temp.at(2);
				vi4 += temp.at(3);
				pay += temp.at(4);

				fortemp.push_back(j + 1);
			};
		};
		
		if (vi1 >= dan && vi2 >= ji && vi3 >= tansu && vi4 >= vita) {
			if (result > pay) {
				list.clear();
				result = min(result, pay);

				for (int j = 0; j < fortemp.size(); j++) {
					list.push_back(fortemp.at(j));
				};
			}
			else if(result == pay){

				bool flag = compare(fortemp, list);

				if (!flag) {
					list.clear();
					for (int j = 0; j < fortemp.size(); j++) {
						list.push_back(fortemp.at(j));
					};
				};
			};
		};
	};

	if (list.empty()) {
		cout << -1 << "\n";
	}
	else {
		std::cout << result << "\n";
		for (int i = 0; i < list.size(); i++) {
			std::cout << list.at(i) << " ";
		};
		std::cout << endl;
	};


	return 0;
};