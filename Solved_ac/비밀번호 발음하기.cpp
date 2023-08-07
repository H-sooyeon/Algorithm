#include <iostream>
using namespace std;
string s;

bool isVowel(int num) {
	if (num == 'a' || num == 'e' || num == 'i' || num == 'o' || num == 'u') return true;

	return false;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int cnt_vowels = 0, cnt_consonant = 0;
	bool flag_vowels = false;
	bool flag = false;
	while (true) {
		cin >> s;
		if (s == "end") break;
		cout << "<" << s << "> ";

		char c = s[0];
		for (int i = 0; i < s.size(); i++) {
			if (isVowel(s[i])) {
				cnt_vowels++;
				cnt_consonant = 0;
				flag_vowels = true;
			}
			else {
				cnt_consonant++;
				cnt_vowels = 0;
			}

			if (i > 0 && c == s[i]) {
				if (c != 'e' && c != 'o') {
					flag = true;
					break;
				}
			}

			if (cnt_consonant == 3 || cnt_vowels == 3) {
				flag = true;
				break;
			}
			if (i > 0) c = s[i];
		}

		if (!flag && flag_vowels) {
			cout << "is acceptable." << endl;
		}
		else {
			cout << "is not acceptable." << endl;
		}

		cnt_consonant = 0;
		cnt_vowels = 0;
		flag_vowels = false;
		flag = false;

	}


	return 0;
}