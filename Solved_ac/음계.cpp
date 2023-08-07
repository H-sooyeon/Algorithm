#include <iostream>
using namespace std;

int main() {

	int result = 0, temp = 0;
	int number[8];

	for (int i = 0; i < 8; i++) {
		cin >> number[i];

		if (i != 0) {
			if (number[i - 1] > number[i]) result = 2;
			else result = 1;

			if (temp != 0 && temp != result) result = 3;

			temp = result;
		}
	}

	switch (result)
	{
	case 1: cout << "ascending" << endl; break;
	case 2: cout << "descending" << endl; break;
	default: cout << "mixed" << endl; break; 
	}

	return 0;
}