#include <iostream>
#include <queue>
#include <vector>
using namespace std;
int h, w;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

 	cin >> h >> w;

	vector<vector<int>> v;
	queue<char> q;

	string s;
	vector<int> in_v;
	int cnt = 0, flag = 0;
	for (int i = 0; i < h; i++) {
		cin >> s;
		for (int j = 0; j < w; j++) {
			q.push(s[j]);
		}
		for (int j = 0; j < w; j++) {
			if (q.front() == 'c') {
				cnt = 0;
				in_v.push_back(cnt);
				q.pop();
				flag = 1;
			}
			else {
				cnt++;
				if (flag == 0) {
					in_v.push_back(-1);
				}
				else {
					in_v.push_back(cnt);
				}
				q.pop();
			}
		}
		
		cnt = 0; flag = 0;
		v.push_back(in_v);
		in_v.clear();
	}

	for (int i = 0; i < v.size(); i++) {
		for (int j = 0; j < w; j++) {
			cout << v[i][j] << " ";
		}
		cout << endl;
	}

	return 0;
}