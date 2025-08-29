function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result[result.length] = array[i];
    }
  }
  return result;
}

const arr2 = [1, 2, 3, 4];
console.log(myFilter(arr2, x => x % 2 === 0)); 
