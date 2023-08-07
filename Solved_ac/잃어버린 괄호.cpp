#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
using namespace std;
string s;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> s;
	vector<int> v;
	string tmp;

	while (s.length()) {
		char c = s[0];
		if (isdigit(c)) {
			tmp += c;
			s.erase(s.begin() + 0);
		}
		else {
			v.push_back(stoi(tmp));
			tmp = s[0];
			s.erase(s.begin() + 0);
		}
	}

	v.push_back(stoi(tmp));

	int minus = 0, plus = 0;
	bool flag = false;
	for (int i = 0; i < v.size(); i++) {
		if (v.at(i) < 0) {
			flag = true;
			minus -= v.at(i);
		}

		if (flag && v.at(i) >= 0) minus += v.at(i);

		if(!flag) plus += v.at(i);
	}

	cout << -minus + plus << "\n";


	return 0;
}