#include <ctype.h>
#include <stdio.h>

int main() {
  char str[256];
  FILE *file = fopen("input.txt", "r");
  if (!file)
    return -1;

  int sum = 0;

  // read a line at a time
  while (fgets(str, 256, file)) {
    // count the length of the line
    int len = 0;
    while (str[len] != '\n')
      len++;

    // look for the first digit
    for (int i = 0; i < len; ++i) {
      if (isdigit(str[i])) {
        sum = sum + 10 * (str[i] - '0');
        break;
      }
    }

    // look for the last digit
    for (int i = len - 1; i >= 0; --i) {
      if (isdigit(str[i])) {
        sum = sum + (str[i] - '0');
        break;
      }
    }
  }

  printf("%d\n", sum);
  fclose(file);

  return 0;
}