function mySlice(array, start = 0, end = array.length) {
  const result = [];

  if (start < 0) start = array.length + start;
  if (start < 0) start = 0;

  if (end < 0) end = array.length + end;
  if (end > array.length) end = array.length;

  for (let i = start; i < end; i++) {
    result[result.length] = array[i];
  }

  return result;
}

const arr3 = [1, 2, 3, 4, 5];
console.log(mySlice(arr3, 1, 4)); 
console.log(mySlice(arr3, -3));   
