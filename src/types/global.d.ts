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

export interface certificateRow {
    name: string;
    image: string;
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