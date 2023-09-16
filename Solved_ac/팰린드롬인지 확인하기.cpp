#include <bits/stdc++.h>
using namespace std;
string str;

int main() {
	ios_base::sync_with_stdio(false);
	cout.tie(NULL);
	cin.tie(NULL);

	cin >> str;

	string original_str = str;
	reverse(str.begin(), str.end());
	if (str.compare(original_str) == 0) {
		cout << 1 << "\n";
	}
	else {
		cout << 0 << "\n";
	}

	return 0;
}