
export type Loading = "wait" | "loading" | "success" | "fail";

export interface LoadURL {
    url: string,
    loading: Loading,
 }

export type ComponentURLElem = LoadURL | null;
