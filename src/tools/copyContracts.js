import fs from 'fs-extra';
import chalk from 'chalk';

fs.copy('build/contracts/TokenMintERC20Token.json', 'src/contracts/TokenMintERC20Token.json', err => {
  if (err) return console.log(chalk.red(err)); // eslint-disable-line no-console
  console.log(chalk.green("Contract TokenMintERC20Token ready!")); // eslint-disable-line no-console
});

fs.copy('build/contracts/TokenMintERC223Token.json', 'src/contracts/TokenMintERC223Token.json', err => {
  if (err) return console.log(chalk.red(err)); // eslint-disable-line no-console
  console.log(chalk.green("Contract TokenMintERC223Token ready!")); // eslint-disable-line no-console
});

