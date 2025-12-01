import kleur from 'kleur';
import path from 'path';
import { fileURLToPath } from 'url';
import countFilesInDirectory from './count-files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = (app, PORT, options = {}) => {
  const { hasApiDocs = false, dbConnected = false } = options;
  const projectRoot = path.join(__dirname, '..', '..');
  const srcPath = path.join(projectRoot, 'src');
  
  // Count files in each directory
  const controllersCount = countFilesInDirectory(path.join(srcPath, 'controllers'));
  const routesCount = countFilesInDirectory(path.join(srcPath, 'routes'));
  const modelsCount = countFilesInDirectory(path.join(srcPath, 'models'));
  
  // Colors and Status
  const apiDocsText = hasApiDocs ? "Yes" : "No";
  const dbStatusText = dbConnected ? "Connected" : "Disconnected";
  const dbStatusColor = dbConnected ? kleur.green().bold : kleur.red().bold;
  const docsStatusColor = hasApiDocs ? kleur.green().bold : kleur.red().bold;

  app.listen(PORT, () => {
    const serverUrl = `http://127.0.0.1:${PORT}`;
    
    const width = 54;
    const border = '═'.repeat(width);

    console.log(`\n╔${border}╗`);
    console.log(`║${' '.repeat(width)}║`);
    
    const projectDeveloper = "zyin-jessie";
    const namePadding = Math.floor((width - projectDeveloper.length) / 2);
    const urlPadding = Math.floor((width - serverUrl.length) / 2);
    
    console.log(`║${' '.repeat(namePadding)}${kleur.white(projectDeveloper)}${' '.repeat(width - projectDeveloper.length - namePadding)}║`);
    console.log(`║${' '.repeat(urlPadding)}${kleur.white().bold(serverUrl)}${' '.repeat(width - serverUrl.length - urlPadding)}║`);
    console.log(`║${' '.repeat(width)}║`);
    
    // Status information with proper spacing
    console.log(`║${' '.repeat(4)}API Docs      : ${docsStatusColor(apiDocsText)}${' '.repeat(14 - apiDocsText.length)}Controllers : ${kleur.magenta().bold(controllersCount.toString())}${' '.repeat(5)}║`);
    console.log(`║${' '.repeat(4)}DB Connection : ${dbStatusColor(dbStatusText)}${' '.repeat(14 - dbStatusText.length)}Routes      : ${kleur.magenta().bold(routesCount.toString())}${' '.repeat(5)}║`);
    console.log(`║${' '.repeat(4)}Environment   : ${kleur.cyan().bold('Development')}${' '.repeat(3)}Models      : ${kleur.magenta().bold(modelsCount.toString())}${' '.repeat(5)}║`);
    console.log(`║${' '.repeat(width)}║`); 
    console.log(`╚${border}╝\n`);
  });
};

export default startServer;