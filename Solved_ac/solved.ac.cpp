#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int size;
	cin >> size;

	vector<int> arr;

	if (size == 0) {
		cout << 0 << "\n";
	}
	else {
		int num;
		for (int i = 0; i < size; i++) {
			cin >> num;
			arr.push_back(num);
		}

		sort(arr.begin(), arr.end());

		int none = floor(size * 0.15 + 0.5);

		int sum = 0, avg;
		for (int i = none; i < arr.size() - none; i++) {
			sum += arr.at(i);
		};

		avg = floor((double)sum / (arr.size() - none * 2) + 0.5);

		cout << avg << '\n';
	}
		
	return 0;
}