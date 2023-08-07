#include <iostream>
using namespace std;

int main() {

	int arr[5];
	int sum = 0;

	for (int i = 0; i < 5; i++) {
		cin >> arr[i];
		sum += (arr[i] * arr[i]);
	}

	int result = sum % 10;
	cout << result << endl;


	return 0;
}