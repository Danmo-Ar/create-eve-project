import fs from 'fs';
import { Question } from 'inquirer';
import { ARCHITECTURE, FRAMEWORK, LANGUAGE } from '../constants.js';

const { APPLICATION, WEBSITE, CRUD, DDD, MVC } = ARCHITECTURE;
const { ANGULAR, REACT, NEXT, NATIF, EXPRESS, NESTJS, SPRING, FLASK } =
  FRAMEWORK;
const { TS, JS, NODE, JAVA, PYTHON } = LANGUAGE;

const promptEn: Record<number | string, Question | Record<string, Question>> = {
  1: [
    {
      type: 'input',

      name: 'name',
      message: 'Enter Your Project Name 📂 : ',

      // TODO : find a better way to this :  default: { name: 'Current directory if nothing is written', value: '.' },
      default: '.',
      validate: (input: string) => {
        const outDir = input === '.' ? process.cwd() : input;
        // check if folder exist
        if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
          return 'The specified folder exist but is not empty';
        }

        return true;
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of project do you want to start 🏗️ : ',

      choices: [{ name: 'Frontend', disabled: true }, 'Backend'],
    },
  ],
  2: {
    Frontend: [
      DynamicPromptArchitecture({
        choices: [
          { name: 'Application', value: APPLICATION },
          { name: 'Website', value: WEBSITE },
        ],
      }),
    ],
    Backend: [
      DynamicPromptArchitecture({
        choices: [
          { name: 'DDD', value: DDD, disabled: true },
          { name: 'MVC', value: MVC, disabled: true },
          { name: '(CRUD SKELETON)', value: CRUD },
        ],
      }),
    ],
  },
  3: {
    Frontend: [
      DynamicPromptLanguage({
        choices: [TS, JS],
      }),
    ],
    Backend: [
      DynamicPromptLanguage({
        choices: [
          NODE,
          { name: JAVA, disabled: true },
          { name: PYTHON, disabled: true },
        ],
      }),
    ],
  },
  4: {
    Frontend: [
      DynamicPromptFrameWork({
        choices: [ANGULAR, REACT, NEXT],
        defaultChoice: REACT,
      }),
    ],
    node: [
      DynamicPromptFrameWork({
        choices: [
          { name: NATIF, disabled: true },
          { name: EXPRESS, disabled: true },

          NESTJS,
        ],
        defaultChoice: NESTJS,
      }),
    ],
    java: [
      DynamicPromptFrameWork({
        choices: [SPRING],
      }),
    ],
    python: [
      DynamicPromptFrameWork({
        choices: [FLASK],
      }),
    ],
  },
};

interface DyanamicPrompt {
  choices: any[];
  defaultChoice?: string;
}

function DynamicPromptArchitecture({ choices, defaultChoice }: DyanamicPrompt) {
  return {
    type: 'list',
    name: 'architecture',
    message: 'What kind of project do you want to start 🎛️ : ',
    choices: choices,
    default: defaultChoice,
  };
}

function DynamicPromptLanguage({ choices, defaultChoice }: DyanamicPrompt) {
  return {
    type: 'list',
    name: 'language',
    message: 'Choose a language 🪐 : ',
    choices: choices,
    default: defaultChoice,
  };
}

function DynamicPromptFrameWork({ choices, defaultChoice }: DyanamicPrompt) {
  return {
    type: 'list',
    name: 'framework',
    message: 'Choose a framework to start 🛠️ : ',
    choices: choices,
    default: defaultChoice,
  };
}

export default promptEn;
