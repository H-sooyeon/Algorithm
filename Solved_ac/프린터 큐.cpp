#include <iostream>
#include <queue>
#include <algorithm>
using namespace std;
int t_case, m, n, arr[101];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> t_case;
	queue<int> q;
	priority_queue<int> pq;
	int idx = 1, value;

	for (int i = 0; i < t_case; i++) {
		cin >> n >> m;
		for (int j = 0; j < n; j++) {
			cin >> arr[j];
			q.push(arr[j]);
			pq.push(arr[j]);
		}
		while (true) {
			if (q.front() == pq.top()) {
				if (m == 0) break;

				q.pop(); pq.pop();
				idx++;
			}
			else {
				value = q.front();
				q.pop(); q.push(value);
				if (m == 0) m = q.size();
			}
			m--;
		}
		printf("%d\n", idx);
		idx = 1;
		q = queue<int>();
		pq = priority_queue<int>();
	}

	return 0;
}