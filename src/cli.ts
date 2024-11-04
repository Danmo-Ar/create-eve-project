#!/usr/bin/env node

import figlet from "figlet";
import { figletColor } from "./helpers/lib/chalk-utility.js";

import { Command } from "commander";
import projectBuilder from "./helpers/builder.js";
import { getVersion, pnpmInstall } from "./helpers/index.js";
import { generatePrompts } from "./prompt/generate-prompts.js";
const program = new Command();

// Setup Cli info
program
	.name("eve")
	.usage("<command> [options]")
	.version(await getVersion()) // TODO : retrieve the version from the packages JSON file
	.description(
		"A CLI to generate a boilerplate project with the best practices",
	)
	.action(() => {
		// chec pnpm and install it if not found
		pnpmInstall();
		// Display the help message if no command is provided

		program.help();
	});

/**
 * This the core of application it use the IIFE : to emcapsulate the launching
 */
(() => {
	// Display the figlet logo
	console.log(
		figletColor(
			figlet.textSync("eve cli", {
				font: "ANSI Shadow",
			}),
		),
	);

	// Remove all listeners to avoid warnings
	process.removeAllListeners("warning");

	program

		.command("init")
		.description("Initialize a new project")
		.action(async (args) => {
			const { projectMeta } = await generatePrompts();

			await projectBuilder(projectMeta);
		});

	// launch the program
	program.parse();
})();
