const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "./node_modules/expo-router/entry.js");

const checkFileExists = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    throw new Error('File does not exist. Please run "npm install".');
  }
};

const prependReflectMetadata = (filePath: string) => {
  checkFileExists(filePath);
  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.startsWith("import 'reflect-metadata';")) {
    const updatedContent = "import 'reflect-metadata';\n" + content;
    fs.writeFileSync(filePath, updatedContent, "utf-8");
    console.log(`'reflect-metadata' imported in ${filePath}`);
  } else {
    console.log(`'reflect-metadata' already exists in ${filePath}`);
  }
};

prependReflectMetadata(FILE_PATH);
