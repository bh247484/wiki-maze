export function articleUrl(title: string) {
  return `https://en.wikipedia.org/wiki/${title}`;
}

export function canonizeTitle(title: string) {
  return title.split('_').join(' ');
}
