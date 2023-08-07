#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <math.h>
using namespace std;
int n, m, j;

int main() {
	
	scanf("%d %d %d", &n, &m, &j);

	int cnt = 0;
	int left = 1, right = m, idx, input;
	for (int i = 0; i < j; i++) {
		scanf("%d", &input);

		if (input <= right && input >= left) continue;

		left = abs(left - input);
		right = abs(right - input);
		idx = min(left, right);
		cnt += idx;

		if (idx == left) {
			left = input;
			right = left + m - 1;
		}
		else {
			right = input;
			left = right - m + 1;
		}
	}

	printf("%d", cnt);

	return 0;
}