#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {

	int n;
	cin >> n;

	int i = 666;
	while (true) {
		if ((to_string(i).find("666")) != -1) n--;
		
		if (n == 0) {
			break;
		}
		i++;
	}

	cout << i << endl;

	return 0;
}