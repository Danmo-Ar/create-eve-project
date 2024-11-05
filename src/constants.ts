export enum ARCHITECTURE {
	APPLICATION = "application",
	WEBSITE = "website",
	DDD = "ddd",
	MVC = "mvc",
	CRUD = "crud",
}

export enum FRAMEWORK {
	ANGULAR = "angular",
	REACT = "react",
	NEXT = "next",
	NATIF = "natif",
	EXPRESS = "express",
	NESTJS = "nestjs",
	SPRING = "spring",
	FLASK = "flask",
}

export enum LANGUAGE {
	TS = "ts",
	JS = "js",
	NODE = "node",
	JAVA = "java",
	PYTHON = "python",
}

export const PROJECT_SCRIPT: Record<
	"next" | "nestjs",
	{ start: string; build: string }
> = {
	next: {
		start: "yarn dev",
		build: "yarn build",
	},
	nestjs: {
		start: "yarn start:dev",
		build: "yarn build",
	},
};
