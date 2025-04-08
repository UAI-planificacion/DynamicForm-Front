export type DocSection = {
    id      : string;
    title   : string;
    icon    : string;
    items   : DocItem[];
};

export type DocItem = {
    id          : string;
    title       : string;
    component   : string;
};