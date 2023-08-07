#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {

	int alphabet[26] = { -1, };
	string s;
	vector<char> v;

	cin >> s;

	for (int i = 0; i < 26; i++) {
		int index = s.find(char(i + 97));

		if (index == string::npos)
			alphabet[i] = -1;
		else
			alphabet[i] = index;

		cout << alphabet[i] << " ";
	}



	return 0;
}