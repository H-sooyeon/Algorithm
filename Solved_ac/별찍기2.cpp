#include <iostream>
using namespace std;

int main() {

	int line;
	cin >> line;

	for (int i = 0; i < line; i++) {
		for (int j = i+1; j < line; j++) {
			cout << " ";
		}
		for (int k = 0; k <= i; k++) {
			cout << "*";
		}
		cout << endl;
	}

	return 0;
}