#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <string>
using namespace std;
int n;

int main() {

	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	while (scanf("%d", &n) != EOF) {
		int count = 1;
		int num = 1;
		while (true) {
			if (num % n == 0) {
				cout << count << endl;
					break;
			}
			num = num * 10 + 1;
			num %= n;
			count++;
		}
	}

	return 0;
}