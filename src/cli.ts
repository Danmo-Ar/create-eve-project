#!/usr/bin/env node

import figlet from 'figlet';
import projectBuilder from './helpers/builder.js';
import { tryCatchWrapper } from './helpers/index.js';
import { figletColor } from './helpers/lib/chalk-utility.js';
import { generatePrompts } from './prompt/generate-prompts.js';

/**
 * This the core of application it use the IIFE : to emcapsulate the launching 
 */


(() => {
  console.log(figletColor(figlet.textSync('Start Project', {})));

  process.removeAllListeners('warning');

  tryCatchWrapper(async () => {
    const { projectMeta } = await generatePrompts();
    await projectBuilder(projectMeta);
  });
})();
