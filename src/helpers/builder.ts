import type { Project } from "../interfaces/Project.js";
import { clonningProcess } from "./commands/github.js";
import { init } from "./commands/init.js";

const projectBuilder = async (project: Project) => {
	const meta = project;
	const { name } = meta;

	await clonningProcess(meta);

	await init(name);
};

export default projectBuilder;
