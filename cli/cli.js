#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const figlet_1 = __importDefault(require("figlet"));
const prompt_en_1 = __importDefault(require("./prompt/prompt-en"));
const ProjectBuilder_1 = __importDefault(require("./helpers/ProjectBuilder"));
const runPrompt = async () => {
    let projectMeta = null;
    let projectType = null;
    let languageRegEx = /node|python|java/;
    let oldprojectType = null;
    const prompts = Object.entries(prompt_en_1.default);
    for (const [_, prompt] of prompts) {
        const castedPrompt = !Array.isArray(prompt)
            ? prompt[projectType]
            : prompt;
        const answers = await inquirer_1.default.prompt(castedPrompt);
        const { type, language } = answers;
        oldprojectType = type || oldprojectType;
        projectType = (language === null || language === void 0 ? void 0 : language.match(languageRegEx)) ? language : oldprojectType;
        projectMeta = Object.assign(Object.assign({}, projectMeta), answers);
    }
    (0, ProjectBuilder_1.default)(projectMeta);
    console.log(projectMeta);
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
