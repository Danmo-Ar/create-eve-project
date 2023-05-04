#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const inquirer_1 = __importDefault(require("inquirer"));
const figlet_1 = __importDefault(require("figlet"));
const prompt_en_1 = __importDefault(require("./prompt/prompt-en"));
const cli = (0, cac_1.default)('create-eve-app');
const runPrompt = async () => {
    const response = null;
    let projectType = null;
    let oldprojectType = null;
    const prompts = Object.entries(prompt_en_1.default);
    for (const [index, prompt] of prompts) {
        const castedPrompt = !Array.isArray(prompt) ? prompt[projectType] : prompt;
        const answers = await inquirer_1.default.prompt(castedPrompt);
        const { type, language } = answers;
        console.log(answers);
        projectType = type || language || projectType;
    }
};
(0, figlet_1.default)('Create Eve Project', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
    try {
        runPrompt();
    }
    catch (err) {
        console.error(err);
    }
});
