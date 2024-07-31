import { writeFileSync } from "node:fs";
import path from "node:path";
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
  const spinner = ora('Checking dependencies...')

  let absolutePkgJsonPath: string = "";
  let pkg: Record<string, string | boolean | number | undefined> = {};

  try {
    spinner.start()
    absolutePkgJsonPath = path.resolve(`${cwd}/package.json`);
    pkg = (await import(absolutePkgJsonPath, { with: { type: "json" } })).default;
    spinner.text = "Checking Done.";
    spinner.succeed()

  } catch (err) {
    spinner.fail()
  }

  return { absolutePkgJsonPath, pkg }



}


export const updatePackageJson = async ({ pkg, absolutePkgJsonPath, projectName }: { pkg: Record<string, string | boolean | number | undefined>, absolutePkgJsonPath: string, projectName?: string }) => {


  pkg.name = dirName(projectName!);

  writeFileSync(absolutePkgJsonPath, JSON.stringify(pkg, null, '\r\n'))
}

export const dirName = (cwd: string) => {
  return cwd === '.' ? process.cwd().split('/').at(-1) : cwd;
}