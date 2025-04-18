export function debounce(fn, ms) {
  let timer;
  return function () {
    const args = arguments; // Capture arguments in a variable
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}
