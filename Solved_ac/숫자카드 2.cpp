#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n, m;
int arr[500001];
vector<pair<int, int>> v;

int solve(int temp) {
	int start = 0;
	int end = v.size() - 1;

	while (start <= end) {
		int mid = (start + end) / 2;
		if (v.at(mid).first == temp) {
			return mid;
		}
		else if (v.at(mid).first > temp) {
			end = mid - 1;
		}
		else if (v.at(mid).first < temp) {
			start = mid + 1;
		}
		else {
			return -3;
		}
	}
	return -3;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	for (int i = 0; i < n; i++) {
		cin >> arr[i];
	}
	sort(&arr[0], &arr[0] + n);

	int pre = arr[0], cnt = 2;
	v.push_back({ pre, 1 });
	for (int i = 1; i < n; i++) {
		if (pre != arr[i]) {
			cnt = 1;
			v.push_back({ arr[i], cnt++});
		}
		else {
			v.pop_back();
			v.push_back({ pre, cnt++ });
		}
		pre = arr[i];
	}

	cin >> m;
	int temp;
	vector<int> result;
	for (int i = 0; i < m; i++) {
		cin >> temp;

		int t = solve(temp);
		if (t == -3) result.push_back(0);
		else result.push_back(v.at(t).second);
	}

	for (int i = 0; i < result.size(); i++) {
		cout << result[i] << " ";
	}
	cout << "\n";

	return 0;
}