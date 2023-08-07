#include <iostream>
using namespace std;

int main() {

	int num_size, number;
	int min = 1000000, max = -1000000;

	cin >> num_size;

	for (int i = 0; i < num_size; i++) {
		cin >> number;
		min = number < min ? number : min;
		max = number > max ? number : max;
	}

	cout << min << " " << max << endl;

	return 0;
}