#include <bits/stdc++.h>
using namespace std;
int n, m;
string s;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m >> s;

	string io = "IO";

	for (int i = 1; i < n; i++) {
		io += "IO";
	};

	io += "I";

	int index = 0, cnt = 0;
	while (index + io.length() <= m && (index = s.find(io, index)) != string::npos) {
		cnt++;
		index += 2;
	};

	cout << cnt << "\n";

	return 0;
}