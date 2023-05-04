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
        choices: ['Application', 'Website'],
        default: 'Application',
      },
    ],
    Backend: [
      {
        type: 'list',
        name: 'architecture',
        message: 'What kind of project do you want to start 🎛️ : ',
        choices: ['DDD', 'MVC'],
        default: 'DDD',
      },
    ],
  },
  3: {
    Frontend: [
      {
        type: 'list',
        name: 'language',
        message: 'Choose a language 🪐 : ',
        choices: ['typescript', 'javascript'],
        default: 'typescript',
      },
    ],
    Backend: [
      {
        type: 'list',
        name: 'language',
        message: 'Choose a language 🪐 : ',
        choices: ['python - flask', 'node', 'java - spring'],
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
        choices: ['native', 'express'],
        default: 'express',
      },
    ],
  },
};
