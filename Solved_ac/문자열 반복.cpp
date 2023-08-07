#include <iostream>
#include <string>
using namespace std;

int main() {

	string arr = "";
	int testcase;

	cin >> testcase;
	
	for (int i = 0; i < testcase; i++) {
		int iterate_num;
		cin >> iterate_num;
		cin >> arr;

		for (int j = 0; j < arr.length(); j++) {
			for (int k = 0; k < iterate_num; k++) {
				cout << arr[j];
			}
		}
		cout << endl;
	}

	return 0;
}