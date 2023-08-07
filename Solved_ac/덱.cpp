#include <iostream>
#include <deque>
#include <string>
using namespace std;
int n;
string str;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;
	int x;
	deque<int> de;
	for (int i = 0; i < n; i++) {
		cin >> str;
		if (str == "push_back") {
			int temp;
			cin >> temp;
			de.push_back(temp);
		}
		else if (str == "push_front") {
			int temp;
			cin >> temp;
			de.push_front(temp);
		}
		else if (str == "pop_front") {
			if (de.empty()) cout << -1 << "\n";
			else {
				cout << de.front() << "\n";
				de.pop_front();
			}
		}
		else if (str == "pop_back") {
			if (de.empty()) cout << -1 << "\n";
			else {
				cout << de.back() << "\n";
				de.pop_back();
			}
		}
		else if (str == "size") cout << de.size() << "\n";
		else if (str == "empty") {
			if (de.empty()) cout << 1 << "\n";
			else cout << 0 << "\n";
		}
		else if (str == "front") {
			if (de.empty()) cout << -1 << "\n";
			else cout << de.front() << "\n";
		}
		else {
			if (de.empty()) cout << -1 << "\n";
			else cout << de.back() << "\n";
		}
	}


	return 0;
}