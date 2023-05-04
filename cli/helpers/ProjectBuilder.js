'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const util_1 = __importDefault(require("util"));
const ncp = util_1.default.promisify(require('ncp').ncp);
const projectBuilder = async (project) => {
    const { name, type, architecture, language, framework } = project;
    const currentDir = process.cwd();
    const outDir = name === '.' ? currentDir : name;
    const templateDir = `../../templates/${type}/${architecture}/${framework}/${language}/`;
    const fullTemplateDir = (0, path_1.join)(__dirname, templateDir);
    try {
        await ncp(fullTemplateDir, outDir);
    }
    catch (err) {
        console.log(err);
    }
    console.log({ outDir, templateDir });
};
exports.default = projectBuilder;
