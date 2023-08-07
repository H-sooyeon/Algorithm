#include <iostream>
#include <queue>
using namespace std;
int n, card;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	queue<int> q;
	for (int i = 1; i <= n; i++) q.push(i);
	
	while (q.size() != 1) {
		q.pop();
		card = q.front();
		q.pop(); q.push(card);
	}

	cout << q.front() << endl;

	return 0;
}