#include <iostream>
#include <string>
using namespace std;

int main() {

	int N_size, result = 0;
	char number;

	cin >> N_size;

	for (int i = 0; i < N_size; i++) {
		cin >> number;
		result += (number-48);
	}

	cout << result << endl;

	return 0;
}