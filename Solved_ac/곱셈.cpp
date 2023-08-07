#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;
long long a, b, c;

long long go(long long A, long long B) {
	if (B == 1) return A % c;

	long long ret = go(A, B / 2);

	ret = (ret * ret) % c;

	if (B % 2) ret = (ret * A) % c;

	return ret;
}

int main() {

	scanf("%d %d %d", &a, &b, &c);

	long long result = go(a, b);

	printf("%d\n", result);


	return 0;
}