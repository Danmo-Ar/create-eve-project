import { Project } from '../interfaces/Project';
import { clonningProcess } from './commands/github.js';

const projectBuilder = async (project: Project) => {
  const meta = project;
  const { name, type, architecture, language, framework } = meta;
  const currentDir = process.cwd();
  const outDir = name === '.' ? currentDir : name;
  clonningProcess(meta);
};

export default projectBuilder;
