import { exec } from "node:child_process";
import { promisify } from "node:util";
import ora from "ora";
import { FRAMEWORK, LANGUAGE } from "../../constants.js";
import type { Project } from "../../interfaces/Project.js";

const execAsync = promisify(exec);

const { NESTJS, NEXT } = FRAMEWORK;
const { NODE, TS } = LANGUAGE;

const templateGithub = new Map()
	.set(
		`${NODE}-${NESTJS}`,
		"https://github.com/Akuma225/nestjs-prisma-mono-skeleton.git",
	)
	.set(`${TS}-${NEXT}`, "https://github.com/Danmo-Ar/nextjs-architecture.git");

const spinner = ora("Clonning the project");

export const clonningProcess = async (project: Project) => {
	try {
		spinner.start();
		await execAsync(
			`git clone ${templateGithub.get(
				`${project.language}-${project.framework}`,
			)} ${project.name}`,
		);
		spinner.text = "Project clonned successfully";
		spinner.succeed();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		spinner.fail();
		console.error(err.message);
	}
	//   if (stderr) {
	//     console.error(`error: ${stderr}`);
	//     return;
	//   }
};
