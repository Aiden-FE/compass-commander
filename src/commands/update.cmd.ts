import { Command } from 'commander';
import ora from 'ora';
import inquirer from 'inquirer';
import shell from 'shelljs';
import {Logger} from "~/services";
import {getRepoReleasesInGithub} from "~/http";
import compareVersion from "~/utils";
import pkg from '../../package.json';

export default (program: Command) => {
  program.command('update')
    .description('检查是否存在新版本内容')
    .action(async () => {
      const loading = ora();
      loading.start(Logger.info('正在检查版本信息', false));
      const releases = await getRepoReleasesInGithub('Aiden-FE', 'compass-commander')
      const lastVersion = releases?.[0]?.name;
      if (!lastVersion || compareVersion(pkg.version, lastVersion) >= 0) {
        loading.succeed(Logger.success('当前已是最新版本', false));
        return;
      }
      loading.warn(Logger.warning('发现新版本', false));
      inquirer.prompt([{
        type: 'confirm',
        name: 'isUpdate',
        message: '是否立即更新',
        default: true,
      }]).then((options) => {
        if (!options.isUpdate) return;
        inquirer.prompt([{
          type: 'list',
          name: 'commandType',
          message: '请选择对应工具更新',
          choices: [
            { name: 'npm', value: 'npm' },
            { name: 'yarn', value: 'yarn' },
            { name: 'pnpm', value: 'pnpm' },
          ],
        }]).then((opts) => {
          const updateLoading = ora();
          updateLoading.start(Logger.info('开始更新', false));
          switch (opts.commandType) {
            case 'npm':
              shell.exec(`npm install -g ${pkg.name}`);
              break;
            case 'yarn':
              shell.exec(`yarn global add ${pkg.name}`);
              break;
            case 'pnpm':
              shell.exec(`pnpm add ${pkg.name} --global`);
              break;
            default:
              break;
          }
          updateLoading.succeed(Logger.success('更新成功,当前已是最新版本.', false));
          shell.exec(`compass -v`);
        });
      });
    });
};
