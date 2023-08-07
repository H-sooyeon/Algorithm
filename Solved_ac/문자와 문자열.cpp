#include <iostream>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	string str;

	cin >> str;

	int idx;
	cin >> idx;

	cout << str[idx-1] << '\n';

	return 0;
}