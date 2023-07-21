export const removeByAttr = function (arr, attr, value) {
  var i = arr.length;
  console.log(arr);
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  console.log(arr);

  return arr;
};
