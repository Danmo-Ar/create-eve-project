import inquirer from "inquirer";
import { exec } from "node:child_process";
import ora from "ora";
import { PROJECT_SCRIPT } from "../../constants.js";
import { Project } from "../../interfaces/Project.js";
import {
	CheckPackageJson,
	dirName,
	getAbsolutePath,
	printBoxText,
	updatePackageJson,
} from "../index.js";

export const init = async ({ name: projectName, ...otherMeta }: Project) => {
	// Get the absolute path of the current working directory
	const absolutePath = getAbsolutePath(projectName);
	const { shouldInstall } = await inquirer.prompt([
		{
			type: "confirm",
			name: "shouldInstall",
			message: "Do you want to install dependencies ?",
		},
	]); // Ask the user if he wants to install the dependencies

	if (!shouldInstall) return; // If the user doesn't want to install the dependencies, return

	const { pkgJson, absolutePkgJsonPath } = await CheckPackageJson(absolutePath); // Check the package.json file
	await updatePackageJson({
		// Update the package.json file
		pkgJson,
		absolutePkgJsonPath,
		projectName: dirName(projectName),
	});

	installDependencies(absolutePath, otherMeta); // Install the dependencies
};

const installDependencies = (
	path: string,
	otherMeta: Omit<Project, "name">,
) => {
	const framework = otherMeta.framework as "nestjs" | "next";
	// TODO: Find the package manager used in the project
	const spinner = ora("Installing dependencies...");
	spinner.start();

	exec("npm install", { cwd: path }, (error, stdout, stderr) => {
		if (error) {
			spinner.fail("Failed to install dependencies");
			console.error(`error: ${stderr}`);
			return;
		}
		spinner.succeed("Done.");

		printBoxText(
			`Dependencies installed successfully 👌\nHappy coding 🚀\n\n🤖 Start : ${PROJECT_SCRIPT[framework].start}\n🔧 Build : ${PROJECT_SCRIPT[framework].build}`,
		);
	});
};
