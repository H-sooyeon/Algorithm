#include <iostream>
#include <vector>
#include <stack>
using namespace std;
int n, arr[1000001], ret[1000001];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	
	stack<int> st_index;
	fill(&ret[0], &ret[0] + 1000001, -1);
	for (int i = 0; i < n; i++) {
		cin >> arr[i];

		while (st_index.size() && arr[st_index.top()] < arr[i]) {
			ret[st_index.top()] = arr[i];
			st_index.pop();
		}

		st_index.push(i);
	}

	for (int i = 0; i < n; i++) {
		cout << ret[i] << " ";
	}
	cout << "\n";

}