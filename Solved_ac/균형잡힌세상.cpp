#include <iostream>
#include <stack>
#include <string>
using namespace std;
string str;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	getline(cin, str);

	while (str != ".") {
		stack<char> st; int flag = 0;

		for (int i = 0; i < str.size(); i++) {
			if (isalpha(str[i]) || str[i] == ' ' || str[i] == '.') continue;

			if (str[i] == '(' || str[i] == '[') st.push(str[i]);
			else if (st.size()) {
				if (st.top() == '(' && str[i] == ')') st.pop();
				else if (st.top() == '[' && str[i] == ']') st.pop();
				else flag = 1;
			}
			else flag = 1;
		}

		if (st.size() == 0 && flag == 0) cout << "yes" << "\n";
		else cout << "no" << "\n";

		getline(cin, str);
	}


	return 0;
}