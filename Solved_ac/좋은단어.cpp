#include <iostream>
#include <string>
#include <stack>
using namespace std;
int n;
string arr[1001];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);
	
	cin >> n;

	for (int i = 0; i < n; i++) {
		cin >> arr[i];
	}

	int count = 0;
	for (int i = 0; i < n; i++) {
		stack<char> st;
		for (int j = 0; j < arr[i].size(); j++) {
			if (st.size() && (st.top() == arr[i][j])) st.pop();
			else st.push(arr[i][j]);
		}
		if (st.size() == 0) count++;
	}

	cout << count << endl;

	return 0;
}