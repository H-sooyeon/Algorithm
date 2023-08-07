#include <iostream>
#include <queue>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	priority_queue<int> q;

	int n;
	bool flag = false;
	while (true) {
		for (int i = 0; i < 3; i++) {
			cin >> n;
			if (n == 0) {
				flag = true;
				break;
			}
			q.push(n);
		}
		if (flag) break;

		long long max = q.top() * q.top();
		q.pop();

		long long result = q.top() * q.top();
		q.pop(); 
		result += (q.top() * q.top());

		if (max == result) cout << "right" << "\n";
		else cout << "wrong" << "\n";

		flag = false;
		q.pop();
	}
	

	return 0;
}