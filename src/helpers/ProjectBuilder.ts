'use strict';

import { join, dirname, resolve } from 'path';
import util from 'util';
import { Project } from '../interfaces/Project';
const ncp = util.promisify(require('ncp').ncp);

const projectBuilder = async (project: Project) => {
  const { name, type, architecture, language, framework } = project;
  const currentDir = process.cwd();
  const outDir = name === '.' ? currentDir : name;
  const templateDir = `../../../templates/${type}/${architecture}/${framework}/${language}/`;

  try {
    await ncp(join(__dirname, templateDir), outDir);
  } catch (err) {
    console.log(err);
  }
  console.log({ outDir, templateDir });
};

export default projectBuilder;
