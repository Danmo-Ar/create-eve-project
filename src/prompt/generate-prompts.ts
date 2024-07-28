import inquirer from 'inquirer';

import { Project } from '../interfaces/Project.js';
import prompt from './prompt-en.js';

const initialPrompt = {
  name: '',
  type: '',
  architecture: '',
  language: '',
  framework: '',
};

export const generatePrompts = async () => {
  let projectMeta: Project = initialPrompt;
  let projectType: string = '';
  let languageRegEx = /node|python|java/;
  let oldprojectType: string | null = null;
  const prompts = Object.entries(prompt);

  for (const [_, prompt] of prompts) {
    const castedPrompt: any[] = !Array.isArray(prompt)
      ? // @ts-ignore
        prompt[projectType!]
      : prompt;

    const answers = await inquirer.prompt(castedPrompt);
    const { type, language } = answers;

    oldprojectType = type || oldprojectType;
    projectType = language?.match(languageRegEx) ? language : oldprojectType;
    projectMeta = { ...projectMeta!, ...answers };
  }

  return { projectMeta };
};
