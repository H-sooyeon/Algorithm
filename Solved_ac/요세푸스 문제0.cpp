#include <iostream>
#include <queue>
#include <vector>
using namespace std;
int n, m;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;

	queue<int> q;
	for (int i = 1; i <= n; i++) q.push(i);

	vector<int> v;
	while (q.size()) {
		for (int i = 0; i < m - 1; i++) {
			int temp = q.front();
			q.pop();
			q.push(temp);
		}
		v.push_back(q.front());
		q.pop();
	}

	cout << "<";
	for (int i = 0; i < v.size(); i++) {
		if (i == v.size() - 1) cout << v.at(i);
		else cout << v.at(i) << ", ";
	}
	cout << ">" << "\n";


	return 0;
}