#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import cac from 'cac';
import inquirer from 'inquirer';
import figlet from 'figlet';
import prompt from './prompt/prompt-en';
import { version } from '../package.json';
import { Project } from './interfaces/Project';

// create cli

const cli = cac('create-eve-app');
//inquierer 8 can be export with commonJs LASTEST VERSION support only ESM module
// setup prompt
const runPrompt = async () => {
  const response: Project | null = null;
  let projectType: string | null = null;
  let oldprojectType: string | null = null;
  const prompts = Object.entries(prompt);

  for (const [index, prompt] of prompts) {
    const castedPrompt = !Array.isArray(prompt) ? prompt[projectType!] : prompt;

    const answers = await inquirer.prompt(castedPrompt);
    const { type, language } = answers;
    console.log(answers);
    projectType = type || language || projectType;
  }
};

// create run function for cli

// const run = () => {
//   cli
//     .command('[directory]', 'project directory')
//     .action((directory: any, cliOptions: any) => {
//       // console.log(directory, cliOptions);
//       const currentDir = process.cwd(); // process.cwd() : current terminal directory

//       // run prompt when directory not provide
//       !directory && runPrompt();
//       // create folder with mkdir node
//       directory &&
//         fs.mkdir(
//           path.resolve(currentDir, directory.toLowerCase()),
//           { recursive: true },
//           (err: any) => {
//             if (err) {
//               throw err;
//             }
//             console.log('Folder created successfully!');
//           }
//         );
//     });

//   cli.help();
//   cli.version(version);
//   cli.parse();
// };

// run figlet
figlet('Create Eve Project', (err: any, data: any) => {
  // setup proper error mesage

  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  try {
    runPrompt();
  } catch (err) {
    console.error(err);
  }
});
