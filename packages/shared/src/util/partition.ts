/**
 * Partition given list of strings into a groups based on the separator symbol.
 *
 * Example: Source: [a, b, *, *, c, *, d], Separator: *
 *
 * Output:
 * [
 *   [a, b],
 *   [c],
 *   [d]
 * ]
 *
 * @param source List of strings
 * @param separator Partition separator
 */
const partition = (source: string[], separator: string): string[][] => {
  const groups: string[][] = [];
  let current: string[] = [];

  for (let i = 0; i < source.length; i++) {
    const line = source[i];

    // Group ends - add current group to the list of groups
    if (line === separator) {
      if (current.length > 0) {
        groups.push(current);
      }

      current = [];

      continue;
    }

    // Add line to the current group
    current.push(line);
  }

  // Add the last group if not empty
  if (current.length > 0) {
    groups.push(current);
  }

  return groups;
};

export default partition;
