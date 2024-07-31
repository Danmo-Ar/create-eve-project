import inquirer from 'inquirer';
import { spawn } from 'node:child_process';
import path from 'node:path';
import ora from 'ora';
import { CheckPackageJson, dirName, updatePackageJson } from '../index.js';

export const init = async (cwd: string) => {
  const absolutePath = path.resolve(cwd);
  const { shouldInstall } = await inquirer.prompt([
    { type: 'confirm', name: 'shouldInstall', message: 'Do you want to install dependencies' },
  ]);

  if (!shouldInstall) return;

  const { pkg, absolutePkgJsonPath } = await CheckPackageJson(cwd);
  await updatePackageJson({ pkg, absolutePkgJsonPath, projectName: dirName(cwd) });

  installDependencies(absolutePath);
};

const installDependencies = (path: string) => {
  const spinner = ora('Installing dependencies...');
  spinner.start();
  const child = spawn('npm', ['install'], { cwd: path });

  child.on('exit', (code) => {
    if (code === 0) {
      spinner.succeed('Dependencies installed successfully');
    } else {
      spinner.fail('Failed to install dependencies');
    }
  });


}