function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[result.length] = callback(array[i], i, array);
  }
  return result;
}


const arr1 = [1, 2, 3];
console.log(myMap(arr1, x => x * 2)); 
