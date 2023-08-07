#include <iostream>
#include <string>
using namespace std;

int main() {

	string str;
	int count = 0;

	getline(cin, str);

	for (int i = 0; i < str.length(); i++)
		if (str[i] == ' ') count++;

	count++;

	if (str[0] == ' ') count--;
	if (str[str.length() - 1] == ' ') count--;

	cout << count << endl;

	return 0;
}