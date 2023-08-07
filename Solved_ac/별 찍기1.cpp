#include <iostream>
using namespace std;

int main() {

	int star_lineNumber;

	cin >> star_lineNumber;

	for (int i = 0; i < star_lineNumber; i++) {
		for (int j = 0; j <= i; j++) {
			cout << "*";
		}
		cout << endl;
	}

	return 0;
}