function prec(n: number) {
  return n.toPrecision(4);
}

export function displayPrec(n: number) {
  const r = prec(n).toString();
  if (r !== "NaN" && r !== "Infinity") {
    return r;
  }
  return "";
}