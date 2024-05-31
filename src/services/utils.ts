export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function randomChoice<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
