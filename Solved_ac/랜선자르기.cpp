#include <iostream>
#include <math.h>
#include <algorithm>
using namespace std;
int arr[10000];
int k, n;

int find(int max_num) {
	long long start = 1;
	long long end = max_num;
	long long mid;
	int count = 0, answer = 0;
	while (start <= end) {
		mid = (start + end) / 2;

		for (int i = 0; i < k; i++) {
			count += arr[i] / mid;
		}

		if (count >= n) {
			start = mid + 1;
			if (answer < mid) {
				answer = mid;
			}
		}
		else  end = mid - 1;

		count = 0;
	}

	return answer;

}

int main() {

	int result;
	cin >> k >> n;

	int max_num = 0;
	for (int i = 0; i < k; i++) {
		cin >> arr[i];
		max_num = max(max_num, arr[i]);
	}

	result = find(max_num);

	cout << result << endl;

	return 0;
}