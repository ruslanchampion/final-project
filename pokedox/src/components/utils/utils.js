export const isNameInArr = function (arr, nameTraget) {
  if (!arr) {
    return false;
  }
  return arr.find((obj) => obj.name === nameTraget);
};

export const toUpperCaseAllWords = function (name) {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
};


const addZeroBeforeThenLessTen = function (num) {
  return num < 10 ? "0" + num : num
}

export const toConverDate = function (dates) {
  const date = new Date(dates)
  const day = addZeroBeforeThenLessTen(date.getDate())
  const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  const hours = addZeroBeforeThenLessTen(date.getHours())
  const minutes = addZeroBeforeThenLessTen(date.getMinutes())
  const seconds = addZeroBeforeThenLessTen(date.getSeconds())
  return `${day}.${month} ${hours}:${minutes}:${seconds}`
}