#include <iostream>
#include <stack>
#include <string>
using namespace std;
int n;
string str;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int x;
	stack<int> st;
	cin >> n;
	for (int i = 0; i < n; i++) {
		cin >> str;
		if (str == "push") {
			cin >> x;
			st.push(x);
		}
		else if (str == "top") {
			if (st.empty()) cout << -1 << "\n";
			else cout << st.top() << "\n";
		}
		else if (str == "pop") {
			if (st.empty()) cout << -1 << "\n";
			else {
				int temp = st.top();
				st.pop();
				cout << temp << "\n";
			}
		}
		else if (str == "size") cout << st.size() << "\n";
		else {
			if (st.empty()) cout << 1 << "\n";
			else cout << 0 << "\n";
		}
	}


	return 0;
}