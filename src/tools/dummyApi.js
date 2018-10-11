export function createTokensDummy() {
  return new Promise((accept) => {
    setTimeout(() => {
      accept(true);
    }, 10000);
  });
}
