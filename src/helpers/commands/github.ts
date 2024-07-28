import { exec } from 'child_process';
import ora from 'ora';
import { promisify } from 'util';
import { FRAMEWORK, LANGUAGE } from '../../constants.js';
import { Project } from '../../interfaces/Project.js';
const execAsync = promisify(exec);

const { NESTJS } = FRAMEWORK;
const { NODE } = LANGUAGE;

const templateGithub = new Map().set(
  `${NODE}-${NESTJS}`,
  'https://github.com/Akuma225/nestjs-prisma-mono-skeleton.git'
);

const spinner = ora('Clonning the project');

export const clonningProcess = async (project: Project) => {
  try {
    spinner.start();
    const { stdout, stderr } = await execAsync(
      `git clone ${templateGithub.get(
        `${project.language}-${project.framework}`
      )} ${project.name}`
    );
    spinner.text = 'Project clonned successfully';
    spinner.succeed();
  } catch (err: any) {
    spinner.fail();
    console.error(err.message);
  }
  //   if (stderr) {
  //     console.error(`error: ${stderr}`);
  //     return;
  //   }
};
