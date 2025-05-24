const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      fixImports(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix relative imports
      content = content.replace(
        /from\s+["']\.\/([^"']+)["']/g, 
        'from "./$1.js"'
      );
      content = content.replace(
        /import\s+["']\.\/([^"']+)["']/g, 
        'import "./$1.js"'
      );
      
      fs.writeFileSync(filePath, content);
    }
  });
}

fixImports('./dist');