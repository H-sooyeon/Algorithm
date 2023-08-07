#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;

int main() {

	int N, X;
	scanf("%d %d", &N, &X);

	int* arr = new int[N];
	int smaller;

	for (int i = 0; i < N; i++) {
		scanf("%d", &arr[i]);
	}

	for (int i = 0; i < N; i++) {
		if (arr[i] < X)
			printf("%d ", arr[i]);
	}
	printf("\n");

	delete[] arr;

	return 0;
}