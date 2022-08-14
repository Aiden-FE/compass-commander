import { Command } from 'commander';

export default (program: Command) => {
  program.command('update')
    .description('检查是否存在新版本内容')
    .action(async () => {
      console.log('run update command');
    });
};
