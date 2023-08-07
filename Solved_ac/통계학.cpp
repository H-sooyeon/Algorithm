#include <iostream>
#include <algorithm>
#include <math.h>
#include <vector>
using namespace std;
int n, arr[500001];

bool compare(pair<int, int> a, pair<int, int> b) {
	if (a.second == b.second) {
		if (a.first > b.first) return a.first < b.first;
	}
	else {
		return a.second > b.second;
	}
}

int main () {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);
	
	int sum = 0, mid, range, mode;
	double avg;
	vector<pair<int, int>> v;

	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		scanf("%d", &arr[i]);
		sum += arr[i];
	}

	sort(arr, arr + n);
	int num;
	/*
	if (sum < 0) {
		avg = (double)sum / n;
		if ((num = avg - (int)avg) < -0.5) avg = ceil(avg);
		else avg = floor(avg + 0.5);
	}
	else {
		avg = round((double)sum / n);
	}
	*/
	avg = floor((double)sum / n + 0.5);
	mid = arr[n / 2];
	range = arr[n - 1] - arr[0];

	int count = 1, max_count = 1, value = arr[0];
	for (int i = 1; i < n; i++) {
		if (value == arr[i]) {
			count++;
		}
		else {
			max_count = max_count < count ? count : max_count;
			if (max_count == count && count != 1) {
				v.push_back(make_pair(value, count));
			}
			count = 1;
		}

		value = arr[i];
		if (i == n - 1 && count != 1) {
			if (max_count <= count) v.push_back(make_pair(value, count));
		}
	}

	stable_sort(v.begin(), v.end(), compare);
	if (n == 1) mode = arr[0];
	else if (!v.size()) mode = arr[1];
	else {
		if (v.size() == 1) mode = v.at(0).first;
		else mode = v.at(1).first;
	}
	

	printf("%d\n", avg);
	printf("%d\n", mid);
	printf("%d\n", mode);
	printf("%d\n", range);

	return 0;
}