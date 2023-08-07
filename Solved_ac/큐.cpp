#include <iostream>
#include <queue>
#include <string>
using namespace std;
int n, x;
string str;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	queue<int> q;
	for (int i = 0; i < n; i++) {
		cin >> str;
		if (str == "push") {
			cin >> x;
			q.push(x);
		}
		else if (str == "pop") {
			if (q.empty()) cout << -1 << "\n";
			else {
				int temp = q.front();
				q.pop();
				cout << temp << "\n";
			}
		}
		else if (str == "size") cout << q.size() << "\n";
		else if (str == "empty") {
			if (q.empty()) cout << 1 << "\n";
			else cout << 0 << "\n";
		}
		else if (str == "front") {
			if (q.empty()) cout << -1 << "\n";
			else cout << q.front() << "\n";
		}
		else {
			if (q.empty()) cout << -1 << "\n";
			else cout << q.back() << "\n";
		}
	}


	return 0;
}