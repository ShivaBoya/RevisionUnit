const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "students");

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
} else {
  console.log("students folder already exists");
}

for (let i = 1; i <= 5; i++) {
  const filePath = path.join(folderPath, `student${i}.txt`);
  fs.writeFileSync(filePath, `This is student ${i}`);
}
console.log("5 student files created");

const files = fs.readdirSync(folderPath);
files.forEach(file => {
  const content = fs.readFileSync(path.join(folderPath, file), "utf-8");
  console.log(`${file}: ${content}`);
});

files.forEach(file => {
  fs.unlinkSync(path.join(folderPath, file));
});
console.log("all files deleted");

fs.rmdirSync(folderPath);
console.log("students folder deleted");
