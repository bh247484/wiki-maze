export function articleUrl(title: string) {
  return `https://en.wikipedia.org/wiki/${title}`;
}

export function canonizeTitle(title: string) {
  return title.split('_').join(' ');
}

export function calculateStrokes(seconds: number, pathLen: number) {
  const timePenalty = Math.floor(seconds / 30);

  return timePenalty + pathLen - 1;
}
