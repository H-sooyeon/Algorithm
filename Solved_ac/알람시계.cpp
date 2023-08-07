#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;

int main() {

	int H, M;
	bool check = false;
	scanf("%d %d", &H, &M);

	if ((M -= 45) < 0) check = true;

	if (check) {
		H -= 1;
		if (H < 0)
			H = 23;

		M = 60 + M;
	}

	printf("%d %d\n", H, M);

	return 0;
}
