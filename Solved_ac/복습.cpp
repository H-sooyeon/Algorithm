#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;
int n;

int main() {
	
	while (scanf("%d", &n) != EOF) {
		int num = 1;
		int count = 1;

		while (true) {
			if (num % n == 0) {
				printf("%d\n", count);
				break;
			}
			num = num * 10 + 1;
			num %= n;
			count++;
		}
	}

	return 0;
}