#include <ctype.h>
#include <stdio.h>
#include <string.h>

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

    // build a list of replacements
    int replace[256];
    const char *numbers[9] = {"one", "two",   "three", "four", "five",
                              "six", "seven", "eight", "nine"};
    int lengths[9] = {3, 3, 5, 4, 4, 3, 5, 5, 4};
    for (int i = 0; i < len; ++i) {
      replace[i] = -1;
      for (int j = 0; j < 9; ++j)
        if (!strncmp(str + i, numbers[j], lengths[j]))
          replace[i] = j;
    }

    // replace all the letter numbers with a number by changing the first letter
    // to a number
    for (int j = 0; j < len; ++j)
      if (replace[j] != -1)
        str[j] = '1' + replace[j];

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