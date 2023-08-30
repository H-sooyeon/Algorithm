#include <bits/stdc++.h>
using namespace std;
int n, bit_arr[21];
char arr[21][21];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	string s;
	for (int i = 0; i < n; i++) {
		cin >> s;
		int bit = 0;
		for (int j = 0; j < n; j++) {
			arr[i][j] = s[j];
			if (s[n-j-1] == 'H') {
				if (j == 0) bit += 1;
				else bit += j * 2;
			};
		};
		bit_arr[i] = bit;
	};
	int ban[21], cnt = 0;
	for (int i = 1; i <= (1 << n); i++) {
		cnt = 0;
		for (int j = 0; j < n; j++) {
			if (bit_arr[j] & i) {
				ban[j] = ~bit_arr[j];
			}
			else {
				ban[j] = bit_arr[j];
			}
		}

		for (int j = 0; j < n; j++) {
			cout << ban[j] << endl;
		};
		memset(ban, 0, sizeof(ban));
	}


	return 0;
}