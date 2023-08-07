#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <string>
using namespace std;

int main() {

	string A, B;
	string result;

	cin >> A >> B;

	for (int i = 2; i >= 0; i--) {
		if (A[i] > B[i]) {
			result = A;
			break;
		}
		else if(A[i] < B[i]) {
			result = B;
			break;
		}
	}

	cout << result[2] << result[1] << result[0];

	return 0;
}
