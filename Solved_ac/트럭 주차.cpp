#include <bits/stdc++.h>
using namespace std;
int a, b, c, arr[101] = { 0, };

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> a >> b >> c;

	int arrive = 0, start = 0;
	for (int i = 0; i < 3; i++) {
		cin >> arrive >> start;

		for (int j = arrive+1; j <= start; j++) {
			arr[j]++;
		};
	};

	int ret = 0;
	for (int i = 0; i < 101; i++) {
 		if (arr[i] == 1) ret += a;
		if (arr[i] == 2) ret += (b * 2);
		if (arr[i] == 3) ret += (c * 3);
	}

	cout << ret << "\n";

	return 0;
}