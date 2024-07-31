import inquirer, { Question } from 'inquirer';

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
  const languageRegEx = /node|python|java/;
  let oldprojectType: string | null = null;
  const prompts = Object.entries(prompt);

  for (const [, prompt] of prompts) {
    const castedPrompt: Question[] = !Array.isArray(prompt)
      ?// @ts-expect-error bad type
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
