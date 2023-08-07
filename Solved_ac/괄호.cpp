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

	cin >> n;
	for (int i = 0; i < n; i++) {
		cin >> str;
		
		stack<char> st;
		int flag = 0;
		for (int i = 0; i < str.size(); i++) {
			if (str[i] == '(') st.push(str[i]);
			else {
				if (!st.empty()) st.pop();
				else flag = 1;
			}
		}

		if (st.size() == 0 && flag == 0) cout << "YES" << endl;
		else cout << "NO" << endl;
		flag = 0;
	}


	return 0;
}