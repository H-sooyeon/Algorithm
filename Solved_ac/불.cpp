#include <bits/stdc++.h>
using namespace std;
int r, c, visited_fire[1001][1001] = { 0, }, ji_visited[1001][1001] = { 0, };
char arr[1001][1001] = { 0, };
int dy[] = { -1, 0, 1, 0 };
int dx[] = { 0, 1, 0, -1 };
int ji_x, ji_y;

void f_bfs() {
    queue<pair<int, int>> q;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (arr[i][j] == 'F') {
                q.push({ i, j });
                visited_fire[i][j] = 1;
            }
        }
    }

    while (!q.empty()) {
        int x, y;
        tie(y, x) = q.front();
        q.pop();

        for (int i = 0; i < 4; i++) {
            int ny = y + dy[i];
            int nx = x + dx[i];

            if (ny >= r || ny < 0 || nx >= c || nx < 0) continue;
            if (arr[ny][nx] == '#' || visited_fire[ny][nx]) continue;

            q.push({ ny, nx });
            visited_fire[ny][nx] = visited_fire[y][x] + 1;
        }
    }
}

int j_bfs() {
    f_bfs();

    queue<pair<int, int>> q;
    q.push({ ji_y, ji_x });
    ji_visited[ji_y][ji_x] = 1;
    
    while (!q.empty()) {
        int x, y;
        tie(y, x) = q.front();
        q.pop();

        for (int i = 0; i < 4; i++) {
            int ny = y + dy[i];
            int nx = x + dx[i];

            if (ny < 0 || ny >= r || nx < 0 || nx >= c) return ji_visited[y][x];
            if (arr[ny][nx] == '#' || ji_visited[ny][nx]) continue;
            if (visited_fire[ny][nx] && ji_visited[y][x] + 1 >= visited_fire[ny][nx]) continue;

            ji_visited[ny][nx] = ji_visited[y][x] + 1;
            q.push({ ny, nx });
        };
    };

    return -1;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    cin >> r >> c;

    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> arr[i][j];
            if (arr[i][j] == 'J') {
                ji_x = j;
                ji_y = i;
            }
        };
    };

    int ret = j_bfs();

    if (ret == -1) cout << "IMPOSSIBLE" << "\n";
    else cout << ret << "\n";

    return 0;
}