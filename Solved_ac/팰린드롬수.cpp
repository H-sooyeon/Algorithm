#include <iostream>
#include <string>
using namespace std;

int main() {

	string str;

	while (cin >> str) {
		if (str == "0") break;

		int flag = 0;
		int count[10] = { 0, };
		for (int i = 0; i < str.size(); i++) {
			count[str[i] - '0']++;
		}

		for (int i = 0; i < 10; i++) {
			if (count[i] != 0 && count[i] & 1) {
				flag++;
			}
		}

		if (str[0] != str[str.size() - 1]) flag = 2;

		if (flag > 1) printf("no\n");
		else printf("yes\n");
	}

	return 0;
}