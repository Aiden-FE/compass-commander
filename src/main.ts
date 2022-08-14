import { Command } from 'commander';
import shell from 'shelljs';
import { version } from '../package.json';
import * as allCommands from './commands';

shell.config.fatal = true; // shell执行中遇错即退出

export default () => {
  const program = new Command();
  
  Object.keys(allCommands)
    .forEach(key => ((allCommands as Record<string, Function>)[key])(program))
  
  program.version(`v${version}`, '-v, --version')
    .description('从0到1搭建前端脚手架')
    .usage('<command> [option]')
    .parse(process.argv);
};
