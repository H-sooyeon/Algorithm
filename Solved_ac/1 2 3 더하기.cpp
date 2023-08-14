#include <bits/stdc++.h>
using namespace std;
int dp[15];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int test, input;
	dp[1] = 1;
	dp[2] = 2;
	dp[3] = 4;

	for (int i = 4; i < 15; i++) {
		dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
	}

	cin >> test;
	for (int i = 0; i < test; i++) {
		cin >> input;

		cout << dp[input] << "\n";
	};

	return 0;
}