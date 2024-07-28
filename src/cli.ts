#!/usr/bin/env node

import figlet from 'figlet';
import projectBuilder from './helpers/builder.js';
import { tryCatchWrapper } from './helpers/general/try-catch-wrapper.js';
import { figletColor } from './helpers/lib/chalk-utility.js';
import { generatePrompts } from './prompt/generate-prompts.js';

(() => {
  console.log(figletColor(figlet.textSync('Start Project', {})));

  tryCatchWrapper(async () => {
    const { projectMeta } = await generatePrompts();
    await projectBuilder(projectMeta);
  });
})();
