// eslint-disable-next-line import/prefer-default-export
export const swapItems = (arr, index, canMoveUp) => {
  const newArr = [...arr];
  let swapIndex;
  if (canMoveUp) {
    swapIndex = index > 0 ? index - 1 : 0;
  } else {
    swapIndex = index < newArr.length - 1 ? index + 1 : newArr.length - 1;
  }
  const temp = arr[index];
  newArr[index] = arr[swapIndex];
  newArr[swapIndex] = temp;

  return newArr;
};
