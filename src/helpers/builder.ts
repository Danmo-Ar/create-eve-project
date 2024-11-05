import type { Project } from "../interfaces/Project.js";
import { clonningProcess } from "./commands/github.js";
import { init } from "./commands/init.js";

const projectBuilder = async (project: Project) => {
	const meta = project;

	await clonningProcess(meta);

	await init(meta);
};

export default projectBuilder;
