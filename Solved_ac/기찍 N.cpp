#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;

int main() {

	int num;
	scanf("%d", &num);

	for (int i = num; i > 0; i--) {
		printf("%d\n", i);
	}

	return 0;
}