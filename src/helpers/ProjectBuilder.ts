'use strict';

import { join, dirname, resolve } from 'path';
import util from 'util';
import { Project } from '../interfaces/Project';
const ncp = util.promisify(require('ncp').ncp);

const projectBuilder = async (project: Project) => {
  const { name, type, architecture, language, framework } = project;
  const currentDir = process.cwd();
  const outDir = name === '.' ? currentDir : name;
  const templateDir = `../../templates/${type}/${architecture}/${framework}/${language}/`;
  const fullTemplateDir = join(__dirname, templateDir);

  // ** check if folder is empty

  // ** get template packages json

  // const packageJson = JSON.parse();

  try {
    await ncp(fullTemplateDir, outDir); // TODO : add ora package for spinner loading
  } catch (err) {
    console.log(err);
  }
  console.log({ outDir, templateDir });
};

export default projectBuilder;
