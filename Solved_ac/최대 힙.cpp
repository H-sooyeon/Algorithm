#include <bits/stdc++.h>
#include <queue>
using namespace std;
int test;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> test;
	int input;
	priority_queue<int, vector<int>> p;
	for (int i = 0; i < test; i++) {
		cin >> input;

		if (input) {
			p.push(input);
		}
		else {
			if (p.empty()) {
				cout << 0 << "\n";
			}
			else {
				cout << p.top() << "\n";
				p.pop();
			};
		};
	};

	return 0;
}