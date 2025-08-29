function mySplit(str, separator) {
  const result = [];
  let current = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === separator) {
      result[result.length] = current;
      current = "";
    } else {
      current += str[i];
    }
  }

  result[result.length] = current; 
  return result;
}

const str = "hello world";
console.log(mySplit(str, " ")); 
