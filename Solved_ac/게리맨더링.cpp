#include <bits/stdc++.h>
using namespace std;
int n, gu[11], ret = 987654321;
int visited[11] = { 0, };
vector<vector<int>> arr;
vector<int> dif;

bool bfs(vector<int> v) {
	memset(visited, 0, sizeof(visited));
	queue<int> q;
	if (!v.empty()) {
		q.push(v.at(0));
		visited[v.at(0)] = 1;
	}

	int cnt = 0;
	while (q.size()) {
		int cur = q.front();
		q.pop();

		for (int i = 0; i < arr[cur].size(); i++) {
			int next = v.at(i);
			if (find(arr[cur].begin(), arr[cur].end(), next) != arr[cur].end() && !visited[next]) {
				q.push(next);
				visited[next] = 1;
				cnt++;
			};
		};
	}
	if (cnt == v.size()) {
		return true;
	}
	else return false;
}

void dif_combi(vector<int> b) {
	for (int i = 1; i <= n; i++) {
		if (find(b.begin(), b.end(), i) == b.end()) {
			dif.push_back(i);
		};
	};

	int sun1 = 0, sun2 = 0;
	if (bfs(b) && bfs(dif)) {
		for (int i = 0; i < b.size(); i++) {
			sun1 += gu[b.at(i)];
		};
		for (int i = 0; i < dif.size(); i++) {
			sun2 += gu[dif.at(i)];
		};
		ret = min(ret, abs(sun1 - sun2));
	};
};

void combi(int start, vector<int> b) {
		dif_combi(b);
		dif.clear();

	for (int i = start + 1; i < n; i++) {
		b.push_back(i + 1);
		combi(i, b);
		b.pop_back();
	};
	return;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	for (int i = 0; i < n; i++) {
		cin >> gu[i];
	};

	int size, adj;
	for (int i = 1; i <= n; i++) {
		cin >> size;
		vector<int> tmp;
		if (size) {
			for (int j = 0; j < size; j++) {
				cin >> adj;
				tmp.push_back(adj);
			}
			arr.push_back(tmp);
		};
	};

	vector<int> b;
	combi(-1, b);

	if (ret != 987654321)
		cout << ret << "\n";
	else cout << -1 << "\n";

	return 0;
}