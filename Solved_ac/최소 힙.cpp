#include <bits/stdc++.h>
using namespace std;
int n;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	multiset<int> m;
	int input;
	for (int i = 0; i < n; i++) {
		cin >> input;
		if (input) {
			m.insert(input);
		}
		else {
			if (m.empty()) {
				cout << 0 << "\n";
			}
			else {
				cout << *m.begin() << "\n";
				m.erase(m.find(*m.begin()));
			};
		};
	};

	return 0;
}