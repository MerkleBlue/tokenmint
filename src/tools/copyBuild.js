import fs from 'fs-extra';
import chalk from 'chalk';

fs.copy('build', 'docs/app', err => {
  if (err) return console.log(chalk.red(err)); // eslint-disable-line no-console
  console.log(chalk.green("Build files are ready for push!")); // eslint-disable-line no-console
});
