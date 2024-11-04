import inquirer from "inquirer";
import { exec } from "node:child_process";
import ora from "ora";
import {
	CheckPackageJson,
	dirName,
	getAbsolutePath,
	updatePackageJson,
} from "../index.js";

export const init = async (projectName: string) => {
	// Get the absolute path of the current working directory
	const absolutePath = getAbsolutePath(projectName);
	console.log({ absolutePath });
	const { shouldInstall } = await inquirer.prompt([
		{
			type: "confirm",
			name: "shouldInstall",
			message: "Do you want to install dependencies ?",
		},
	]); // Ask the user if he wants to install the dependencies

	if (!shouldInstall) return; // If the user doesn't want to install the dependencies, return

	const { pkg, absolutePkgJsonPath } = await CheckPackageJson(absolutePath); // Check the package.json file
	await updatePackageJson({
		// Update the package.json file
		pkg,
		absolutePkgJsonPath,
		projectName: dirName(projectName),
	});

	installDependencies(absolutePath); // Install the dependencies
};

const installDependencies = (path: string) => {
	// TODO: Find the package manager used in the project
	const spinner = ora("Installing dependencies...");
	spinner.start();

	exec("npm install", { cwd: path }, (error, stdout, stderr) => {
		if (error) {
			spinner.fail("Failed to install dependencies");
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.error(`stderr: ${stderr}`);
		spinner.succeed("Dependencies installed successfully");
	});
};
