#include <iostream>
using namespace std;

int main() {

	int numbers[9];
	int max = 0, index;

	for (int i = 0; i < sizeof(numbers) / sizeof(numbers[0]); i++) {
		cin >> numbers[i];
		if (max < numbers[i]) {
			max = numbers[i];
			index = i;
		}
	}

	index += 1;

	cout << max << endl << index << endl;

	return 0;
}