#include <iostream>
#include <math.h>
using namespace std;

int main() {

	int x, y, w, h;
	cin >> x >> y >> w >> h;

	int right_boundary, left_boundary;
	int top_boundary, bottom_boundary;
	int result;

	right_boundary = abs(w-x);
	left_boundary = x;
	bottom_boundary = y;
	top_boundary = abs(y - h);

	result = min(right_boundary, left_boundary);
	int tmp = min(top_boundary, bottom_boundary);

	result = min(result, tmp);

	cout << result << endl;


	return 0;
}