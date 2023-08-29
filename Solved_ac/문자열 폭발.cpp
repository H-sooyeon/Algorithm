#include <bits/stdc++.h>
using namespace std;
string s, bomb;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> s >> bomb;

	stack<char> st;
	string check = "";

	for (int i = 0; i < s.size(); i++) {
		st.push(s.at(i));

		if (st.size() >= bomb.size() && st.top() == bomb[bomb.size() - 1]) {
			check = "";
			for (int j = 0; j < bomb.size(); j++) {
				check += st.top();
				st.pop();
			};

			reverse(check.begin(), check.end());

			if (check.compare(bomb) != 0) {
				for (int j = 0; j < bomb.size(); j++) {
					st.push(check.at(j));
				};
			};
		};
	};

	string ret = "";
	int st_size = st.size();
	for (int i = 0; i < st_size; i++) {
		ret += st.top();
		st.pop();
	}; 
	reverse(ret.begin(), ret.end());

	if (ret.empty()) cout << "FRULA" << "\n";
	else cout << ret << "\n";

	return 0;
}