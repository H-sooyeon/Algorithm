#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;
int n, m, visited[101];
vector<int> v[101];
int sum;

void bfs(int start) {
	visited[start] = 1;
	queue<int> q;
	q.push(start);

	while (q.size()) {
		int here = q.front();
		q.pop();
		for (int there : v[here]) {
			if (visited[there]) continue;
			q.push(there);
			visited[there] = visited[here] + 1;
		}
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n >> m;

	int input_n, input_m;
	vector<int> user;
	for (int i = 0; i < m; i++) {
		cin >> input_n >> input_m;

		v[input_n].push_back(input_m);
		v[input_m].push_back(input_n);

		user.push_back(input_n);
		user.push_back(input_m);
	}

	sort(user.begin(), user.end());
	user.erase(unique(user.begin(), user.end()), user.end());

	int ret = 987654321, fre;
	for (int i = 0; i < user.size(); i++) {
		sum = 0;
		fill(visited, visited + 101, 0);
		bfs(user.at(i));

		for (int j = 0; j < user.size(); j++) {
			sum += (visited[user.at(j)] - 1);
		}

		if (sum < ret) {
			ret = sum;
			fre = user.at(i);
		}
	}

	cout << fre << "\n";

	return 0;
}