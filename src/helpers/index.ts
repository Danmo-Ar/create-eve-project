import { writeFileSync } from "node:fs";
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
		absolutePkgJsonPath = `${cwd}/package.json`;
		console.log(absolutePkgJsonPath);
		pkg = (await import(absolutePkgJsonPath, { with: { type: "json" } }))
			.default;
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
	return (
		projectName === "." ? process.cwd() : `${process.cwd()}/${projectName}`
	).replace(/\\/g, "/");
};
