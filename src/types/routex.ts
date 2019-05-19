import { CookieSerializeOptions } from "cookie";

declare module "routex" {
  export interface ICtx {
    cookies: ICookies;
  }
}

export interface ICookies {
  all: { [key: string]: string };
  get: (prop: string) => string | undefined;
  set: (
    prop: string,
    value: string,
    serializeOptions?: CookieSerializeOptions
  ) => void;
}
