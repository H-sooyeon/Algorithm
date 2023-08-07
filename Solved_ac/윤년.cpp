#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;

int main() {

	int year;
	bool check = false;

	scanf("%d", &year);

	if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0))
		check = true;

	if (check)
		printf("1\n");
	else
		printf("0\n");

	return 0;
}
