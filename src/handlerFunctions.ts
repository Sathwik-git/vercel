import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath: string) => {
  let filepaths: string[] = [];
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      filepaths = filepaths.concat(getAllFiles(filePath));
    } else {
      filepaths.push(filePath);
    }
  }

  return filepaths;
};
