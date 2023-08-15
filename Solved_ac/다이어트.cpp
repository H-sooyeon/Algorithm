#include <bits/stdc++.h>
using namespace std;
int cnt, minIn[5];
int dan[16], ji[16], tansu[16], vita[16], pay[16];
int minPay = 500 * 15;
vector<int> result;

void check(vector<int> b) {
	int a = 0, b2 = 0, c = 0, d = 0;
	int account = 0;
	for (int i = 0; i < b.size(); i++) {
		a += dan[b.at(i)];
		b2 += ji[b.at(i)];
		c += tansu[b.at(i)];
		d += vita[b.at(i)];

		account += pay[b.at(i)];
	};

	if (a < minIn[0] || b2 < minIn[1] || c < minIn[2] || d < minIn[3]) return;

	if (minPay >= account) {
		minPay = account;
		result.clear();
		for (int i = 0; i < b.size(); i++) {
			result.push_back(b.at(i));
		};
	};
};

void combi(int start, vector<int> b, int r) {
	if (b.size() == r) {
		check(b);
		return;
	};

	for (int i = start + 1; i < cnt; i++) {
		b.push_back(i);
		combi(i, b, r);
		b.pop_back();
	};
	return;
};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> cnt;

	for (int i = 0; i < 4; i++) {
		cin >> minIn[i];
	};
	

	for (int i = 0; i < cnt; i++) {
		cin >> dan[i] >> ji[i] >> tansu[i] >> vita[i] >> pay[i];
	};

	vector<int> v;
	for (int i = 1; i <= cnt; i++) {
		combi(-1, v, i);
	};


	if (result.empty()) {
		cout << "-1" << "\n";
	}
	else {
		cout << minPay << "\n";
		sort(result.begin(), result.end());
		for (int i = 0; i < result.size(); i++) {
			cout << result.at(i) + 1 << " ";
		};
		cout << "\n";
	}

	return 0;
}