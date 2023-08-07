#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n;
vector<string> v;
string s;
string num_string = "";

bool cmp(string a, string b) {
	if (a.size() == b.size()) return a < b;
	return a.size() < b.size();
}

void go() {
	while (true) {
		if (num_string.size() && num_string.front() == '0') num_string.erase(0, 1);
		else break;
	}
	if (num_string.size() == 0) num_string = "0";
	v.push_back(num_string);
	num_string = "";
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	for (int i = 0; i < n; i++) {
		cin >> s;
		for (int j = 0; j < s.size(); j++) {
			if ('0' <= s[j] && '9' >= s[j]) num_string += s[j];
			else if (num_string.size()) go();
		}

		if (num_string.size()) go();
	}
	
	sort(v.begin(), v.end(), cmp);

	for (int i = 0; i < v.size(); i++) {
		cout << v.at(i) << "\n";
	}
	
	return 0;
}