#include <iostream>
#include <algorithm>
#include <string>
using namespace std;
int n, winner, prev_v, prev_t = 0, next_t;

int second(int min, int sec) {
	return min * 60 + sec;
}

string orig(int sec) {
	string res_min, res_sec, res = "";
	int min = sec / 60;
	int s = sec % 60;
	
	res_min = "00" + to_string(min);
	res_sec = "00" + to_string(s);

	res += res_min.substr(res_min.size() - 2, 2) + ":";
	res += res_sec.substr(res_sec.size() - 2, 2);

	return res;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	cin >> n;

	string time;
	int min, sec;
	int team1 = 0, team2 = 0;
	int cnt1 = 0, cnt2 = 0, winner_time = 0;;
	for (int i = 0; i < n; i++) {
		cin >> winner >> time;

		min = stoi(time.substr(0, 2));
		sec = stoi(time.substr(3, 2));

		winner_time = second(min, sec);
		if (cnt1 > cnt2) {
			team1 += (winner_time - prev_v);
		}
		else if (cnt1 < cnt2) {
			team2 += (winner_time - prev_v);
		}

		if (winner == 1) cnt1++;
		else cnt2++;

		prev_v = winner_time;
	}

	if (cnt1 > cnt2) team1 += (2880 - prev_v);
	else if(cnt1 < cnt2) team2 += (2880 - prev_v);

	cout << orig(team1) << "\n";
	cout << orig(team2) << "\n";

	return 0;
}