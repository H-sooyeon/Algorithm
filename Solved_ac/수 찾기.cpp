#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n, m;
int arr[100001];

bool find(int x) {
	int start = 0;
	int end = n - 1;

	while (start <= end) {
		int mid = (start + end) / 2;

		if (arr[mid] == x) return true;
		
		if (arr[mid] < x) {
			start = mid + 1;
		}
		else {
			end = mid - 1;
		}
	}
	return false;
}

int main() {
	
	scanf("%d", &n);

	for (int i = 0; i < n; i++) {
		int tmp;
		scanf("%d", &tmp);
		arr[i] = tmp;
	}
	sort(arr, arr + n);

	scanf("%d", &m);
	while (m--) {
		int tmp;
		scanf("%d", &tmp);
		if (find(tmp)) {
			printf("1\n");
		}
		else {
			printf("0\n");
		}
	}

	return 0;
}