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

export const CheckPackageJson = async (cwd: string) => {
	const spinner = ora("Checking dependencies...");

	let absolutePkgJsonPath = "";
	let pkg: Record<string, string | boolean | number | undefined> = {};

	try {
		spinner.start();
		absolutePkgJsonPath = path.resolve(cwd, "package.json");

		const pkgData = await readFile(absolutePkgJsonPath, "utf-8");
		if (!pkgData) {
			spinner.fail("package.json not found.");
			return;
		}

		pkg = JSON.parse(pkgData);

		spinner.text = "Checking Done.";
		spinner.succeed();
	} catch (err) {
		spinner.fail();
	}

	return { absolutePkgJsonPath, pkg };
};

export const updatePackageJson = async ({
	pkg,
	absolutePkgJsonPath,
	projectName,
}: {
	pkg: Record<string, string | boolean | number | undefined>;
	absolutePkgJsonPath: string;
	projectName?: string;
}) => {
	pkg.name = dirName(projectName);

	writeFileSync(absolutePkgJsonPath, JSON.stringify(pkg, null, 4));
};

export const dirName = (projectName: string | undefined) => {
	return projectName === "." ? process.cwd().split("/").at(-1) : projectName;
};

export const getAbsolutePath = (projectName: string) => {
	return normalize(
		projectName === "." ? process.cwd() : `${process.cwd()}/${projectName}`,
	);
};