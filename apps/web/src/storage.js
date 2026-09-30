export const KEY = "science-practicals:v2";
export function readStore() {
  try {
    const x = JSON.parse(localStorage.getItem(KEY));
    return x && typeof x === "object" && !Array.isArray(x) ? x : {};
  } catch {
    return {};
  }
}
export function writeStore(x) {
  try {
    localStorage.setItem(KEY, JSON.stringify(x));
    return true;
  } catch {
    return false;
  }
}
export function saveLesson(id, state) {
  const s = readStore();
  s.lessons = { ...s.lessons, [id]: state };
  return writeStore(s);
}
