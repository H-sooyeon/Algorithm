#include <iostream>
using namespace std;

int main() {

	int size;
	cin >> size;

	double *scores = new double[size];
	int max = 0;
	double sum = 0;

	for (int i = 0; i < size; i++) {
		cin >> scores[i];
		max = scores[i] > max ? scores[i] : max;
	}

	for (int i = 0; i < size; i++) {
		scores[i] = scores[i] / max * 100;
		sum += scores[i];
	}
	
	cout << sum / size << endl;

	delete[] scores;

	return 0;
}