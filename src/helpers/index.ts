import boxen, { Options } from "boxen";
import { writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path, { normalize } from "node:path";
import ora from "ora";

export const tryCatchWrapper = async (fn: () => Promise<void>) => {
	try {
		await fn();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

export type PkgJson = Record<string, string | boolean | number | undefined>;

export const CheckPackageJson = async (cwd: string) => {
	const spinner = ora("Checking dependencies...");

	let absolutePkgJsonPath = "";
	let pkgJson: PkgJson = {};

	try {
		spinner.start();
		absolutePkgJsonPath = path.resolve(cwd, "package.json");

		const pkgData = await readFile(absolutePkgJsonPath, "utf-8");
		if (!pkgData) {
			spinner.fail("package.json not found.");
			throw new Error("package.json not found.");
		}

		pkgJson = JSON.parse(pkgData);

		spinner.text = "Checking Done.";
		spinner.succeed();
	} catch (err) {
		spinner.fail();
	}

	return { absolutePkgJsonPath, pkgJson };
};

export const updatePackageJson = async ({
	pkgJson,
	absolutePkgJsonPath,
	projectName,
}: {
	pkgJson: Record<string, string | boolean | number | undefined>;
	absolutePkgJsonPath: string;
	projectName?: string;
}) => {
	pkgJson.name = dirName(projectName);

	writeFileSync(absolutePkgJsonPath, JSON.stringify(pkgJson, null, 4));
};

export const dirName = (projectName: string | undefined) => {
	return projectName === "." ? process.cwd().split("/").at(-1) : projectName;
};

export const getAbsolutePath = (projectName: string) => {
	return normalize(
		projectName === "." ? process.cwd() : `${process.cwd()}/${projectName}`,
	);
};

// export const pnpmInstall = () => {
// 	// check if pnpm is installed
// 	exec("pnpm --version", (error) => {
// 		if (error) {
// 			console.error(
// 				"pnpm is not installed, it will be installed automatically by the cli.",
// 			);
// 			exec("npm install -g pnpm", (error) => {
// 				if (error) {
// 					console.error("Failed to install pnpm, please install it manually.");
// 					return;
// 				}
// 				console.log("pnpm installed successfully");
// 			});
// 		}
// 	});
// };

export const getVersion = async () => {
	const pkg = await readFile(
		new URL("../../package.json", import.meta.url),
		"utf-8",
	);
	return JSON.parse(pkg).version;
};

export const printBoxText = (text: string, options?: Options) => {
	console.log(
		boxen(text, {
			padding: 1,
			width: 60,
			borderStyle: "round",
			dimBorder: true,
			...options,
		}),
	);
};
