const { program } = require('commander');
const { exec } = require('child_process');
const fs = require('fs');

program
  .version('1.0.0')
  .description(
    'CLI tool to Use grid selection tool as template and providing X and Y as initial value'
  );

program
  .command('init [x] [y]')
  .description(
    'Use grid selection tool as template and providing X and Y as initial value'
  )
  .action((x = 16, y = 8) => {
    const url =
      'https://github.com/talhakhalid-tech/symbols-grid-tool-assignment';
    const clonedRepoPath = `./${url
      .split('/')
      [url.split('/').length - 1].replace('.git', '')}`;
    const configFilePath = `${clonedRepoPath}/config.js`;

    exec(`git clone ${url}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error using template: ${stderr}`);
      } else {
        console.log(`Template used successfully`);
        const configContent = fs.readFileSync(configFilePath, 'utf-8');

        const updatedConfigContent = configContent
          .replace('{{X}}', x)
          .replace('{{Y}}', y);

        fs.writeFileSync(configFilePath, updatedConfigContent);

        console.log(
          `Initialization complete! Values in config.js updated to X=${x} and Y=${y}`
        );
      }
    });
  });

program.parse(process.argv);
