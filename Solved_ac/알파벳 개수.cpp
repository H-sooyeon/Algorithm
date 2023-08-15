#include <bits/stdc++.h>
using namespace std;
string s;
int alpha[27] = { 0, };

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> s;

	for (int i = 0; i < s.length(); i++) {
		alpha[s[i] - 'a']++;
	};

	for (int i = 0; i < 26; i++) {
		cout << alpha[i] << " ";
	};
	cout << "\n";

	return 0;
}