#include <iostream>
#include <string>
using namespace std;

int main() {

	int A, B, C, mul;
	string mul_str;
	int result[10] = {0, };

	cin >> A >> B >> C;
	mul = A * B * C;

	mul_str = to_string(mul);

	for (int i = 0; i < mul_str.length(); i++) {
		result[mul_str[i] - 48]++;
	}

	for (int i = 0; i < 10; i++) {
		cout << result[i] << endl;
	}

	return 0;
}