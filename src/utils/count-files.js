import fs from 'fs';
import path from 'path';

const countFilesInDirectory = (dirPath, extensions = ['.js']) => {
  try {
    if (!fs.existsSync(dirPath)) return 0;
    const files = fs.readdirSync(dirPath);
    return files.filter(file => 
      fs.statSync(path.join(dirPath, file)).isFile() && 
      !file.startsWith('.') &&
      extensions.includes(path.extname(file))
    ).length;
  } catch (error) {
    return 0;
  }
};

export default countFilesInDirectory;