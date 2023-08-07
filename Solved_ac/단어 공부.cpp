#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {

	string str;
	bool flag = false;

	cin >> str;

	// transform(str.begin(), str.end(), str.begin(), tolower);

	int alpha[26] = { 0, };
	int index, max = 0;

	for (int i = 0; i < str.length(); i++) {
		if (str[i] < 97) str[i] += 32;
		alpha[(int)(str[i] - 97)]++;
	}

	for (int i = 0; i < sizeof(alpha) / sizeof(int); i++) {
		if (alpha[i] == 0) continue;
		if (max < alpha[i]) {
			max = alpha[i];
			index = i;
			flag = false;
		}
		else if (max == alpha[i]) {
			flag = true;
		}
	}

	if (!flag) {
		cout << (char)(index + 65) << endl;
	}
	else {
		cout << "?" << endl;
	}

	return 0;
}