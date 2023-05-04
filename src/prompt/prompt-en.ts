export default {
  1: [
    {
      type: 'input',
      name: 'name',
      message: 'Enter Your Project Name 📂 : ',
      default: '.',
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of project do you want to start 🏗️ : ',
      choices: ['Frontend', 'Backend'],
    },
  ],
  2: {
    Frontend: [
      {
        type: 'list',
        name: 'architecture',
        message: 'What kind of project do you want to start 🎛️ : ',
        choices: [
          { name: 'Application', value: 'application' },
          { name: 'Website', value: 'website' },
        ],
        default: 'application',
      },
    ],
    Backend: [
      {
        type: 'list',
        name: 'architecture',
        message: 'What kind of project do you want to start 🎛️ : ',
        choices: [
          { name: 'DDD', value: 'ddd' },
          { name: 'MVC', value: 'mvc' },
        ],
        default: 'ddd',
      },
    ],
  },
  3: {
    Frontend: [
      {
        type: 'list',
        name: 'language',
        message: 'Choose a language 🪐 : ',
        choices: [
          { name: 'typescript', value: 'ts' },
          { name: 'javascript', value: 'js' },
        ],
        default: 'typescript',
      },
    ],
    Backend: [
      {
        type: 'list',
        name: 'language',
        message: 'Choose a language 🪐 : ',
        choices: ['python', 'node', 'java'],
        default: 'node',
      },
    ],
  },
  4: {
    Frontend: [
      {
        type: 'list',
        name: 'framework',
        message: 'Choose a framework to start 🛠️ : ',
        choices: ['angular', 'react', 'next'],
        default: 'react',
      },
    ],
    node: [
      {
        type: 'list',
        name: 'framework',
        message: 'Choose a framework to start 🛠️ : ',
        choices: ['natif', 'express'],
        default: 'express',
      },
    ],
    java: [
      {
        type: 'list',
        name: 'framework',
        message: 'Choose a framework to start 🛠️ : ',
        choices: ['spring'],
        default: 'spring',
      },
    ],
    python: [
      {
        type: 'list',
        name: 'framework',
        message: 'Choose a framework to start 🛠️ : ',
        choices: ['flask'],
        default: 'flask',
      },
    ],
  },
};
