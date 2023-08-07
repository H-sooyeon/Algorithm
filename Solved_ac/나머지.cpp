#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
	
	int N, temp;
	vector<int> v;
	
	for (int i = 0; i < 10; i++) {
		scanf("%d", &N);

		temp = N % 42;
		if (find(v.begin(), v.end(), temp) == v.end()) {
			v.push_back(temp);
		}
	}

	printf("%d", v.size());

	return 0;
}