#!/usr/bin/env node
// import fs from 'fs';
// import path from 'path';
// import cac from 'cac';
import inquirer from 'inquirer';
import figlet from 'figlet';
import prompt from './prompt/prompt-en';
// import { version } from '../package.json';
import { Project } from './interfaces/Project';
import projectBuilder from './helpers/ProjectBuilder';
// TODO : add chalk package to displayed colored console text
// create cli

// const cli = cac('create-eve-project');
//inquierer 8 can be export with commonJs LASTEST VERSION support only ESM module
// setup prompt
const runPrompt = async () => {
  let projectMeta: Project | null = null;
  let projectType: string | null = null;
  let languageRegEx = /node|python|java/;
  let oldprojectType: string | null = null;
  const prompts = Object.entries(prompt);

  for (const [_, prompt] of prompts) {
    const castedPrompt: any[] = !Array.isArray(prompt)
      ? prompt[projectType!]
      : prompt;

    const answers = await inquirer.prompt(castedPrompt);
    const { type, language } = answers;

    oldprojectType = type || oldprojectType;
    projectType = language?.match(languageRegEx) ? language : oldprojectType;
    projectMeta = { ...projectMeta!, ...answers };
  }

  // Build Project Base on Template

  projectBuilder(projectMeta!);

  console.log(projectMeta!);
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
