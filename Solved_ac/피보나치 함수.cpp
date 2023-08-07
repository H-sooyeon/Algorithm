#include <iostream>
using namespace std;
int testcase, arr[41];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

    arr[0] = 0;
    arr[1] = 1;
    for (int i = 2; i <= 40; i++) {
        arr[i] = arr[i - 2] + arr[i - 1];
    }

    cin >> testcase;

    int tmp;
    for (int i = 0; i < testcase; i++) {
        cin >> tmp;
        if (tmp == 0) {
            cout << 1 << " " << 0 << "\n";
        }
        else if (tmp == 1) {
            cout << 0 << " " << 1 << "\n";
        }
        else {
            cout << arr[tmp - 1] << " " << arr[tmp] << "\n";
        }
    }


	return 0;
}