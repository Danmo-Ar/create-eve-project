import { Project } from '../interfaces/Project';
import { clonningProcess } from './commands/github.js';
import { init } from './commands/init';

const projectBuilder = async (project: Project) => {
  const meta = project;
  const { name, type, architecture, language, framework } = meta;

  const outDir = name === '.' ? process.cwd() : name;

  await clonningProcess(meta);

  await init;
};

export default projectBuilder;
