#include <bits/stdc++.h>
using namespace std;
int n, m, arr[300004];

bool check(int mid) {
	int kids = 0;
	for (int i = 0; i < m; i++) {
		kids += arr[i] / mid;
		if (arr[i] % mid) kids++;
	};
	return kids <= n;
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;

	int ret = 987654321;
	int big_color = 0;
	for (int i = 0; i < m; i++) {
		cin >> arr[i];
		big_color = max(big_color, arr[i]);
	};

	int high = big_color, low = 1;
	while (high >= low) {
		int mid = (high + low) / 2;
		if (check(mid)) {
			// ���̵� ������ ���ų� ���� ���������� ���
			// �� ���� �����ִ� ���� ���δ�.
			ret = min(ret, mid);
			high = mid - 1;
		}
		else {
			// ���̵� ������ ũ�ų� ���� ���������� ���
			// �� ���� �����ִ� ���� Ű���.
			low = mid + 1;
		};
	};

	cout << ret << "\n";


	return 0;
};