#include <iostream>
#include <stack>
#include <vector>
using namespace std;
int n, arr[100001], pointer = 0;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	for (int i = 0; i < n; i++) {
		cin >> arr[i];
	}

	stack<int> st;
	vector<char> v;

	int i = 1;
	while (i < (n * 2 + 1)) {
		if (!st.empty() && (arr[pointer] == st.top())) {
			st.pop();
			pointer++;
			v.push_back('-');
		}
		else {
			if (arr[pointer] < i) break;
			st.push(i);
			v.push_back('+');
			i++;
		}
	}

	if (st.empty()) {
		for (int i = 0; i < v.size(); i++)
			printf("%c\n", v.at(i));
	}
	else printf("NO\n");

	return 0;
}