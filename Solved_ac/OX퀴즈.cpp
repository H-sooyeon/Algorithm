#include <iostream>
#include <string>
using namespace std;

int main() {

	int testcase;
	int result = 0;
	int plus = 1;
	string Q;

	cin >> testcase;

	for (int i = 0; i < testcase; i++) {
		cin >> Q;

		for (int j = 0; j < Q.length(); j++) {
			if (Q[j] == 'O') {
				result = result + plus;

				plus++;
			}
			else {
				plus = 1;
			}
		}

		cout << result << endl;
		result = 0;
		plus = 1;
	}

	return 0;
}