#include <iostream>
using namespace std;

int main() {

	int A, B;

	cin >> A >> B;

	double result = (double)A / B;

	cout << fixed;
	cout.precision(9);

	cout << result << endl;

	return 0;
}