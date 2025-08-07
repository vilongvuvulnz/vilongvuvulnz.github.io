export interface projectRow {
    name: string;
    type: string;
    tech_stack: string[];
    thumbnail: string;
    link: string;
    github_link: string;
    images: string[];
    [key: string]: string;
};

export interface achievementRow {
    name: string;
    type: string;
    category: string;
    scope: string;
    skills: string[];
    thumbnail: string;
    images: string[];
    [key: string]: string;
};

export interface supportedLangRow {
    code: string;
    name: string;
    sheetName: string;
};

export interface translations {
    [key: string]: {
        [key: string]: string;
    };
}