#include <iostream>
#include <sstream>
#include <string>
using namespace std;


int main() {

	string str, word;

	getline(cin, str);
	istringstream ss(str);

	int count = 0;

	while (ss >> word) {
		count++;
	}

	cout << count << endl;

	return 0;
}