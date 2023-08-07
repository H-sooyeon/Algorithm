#include <iostream>
#include <stack>
using namespace std;
int k;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> k;
	stack<int> st;
	int tmp;
	for (int i = 0; i < k; i++) {
		cin >> tmp;
		if (tmp == 0 && st.size()) st.pop();
		else st.push(tmp);
	}

	int ret = 0;
	while (!st.empty()) {
		ret += st.top();
		st.pop();
	}

	cout << ret << "\n";

	return 0;
}