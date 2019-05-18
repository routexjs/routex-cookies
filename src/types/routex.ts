import { CookieSerializeOptions } from "cookie";

interface ICtxCookies {
  cookies: ICookies;
}

declare module "routex" {
  // tslint:disable-next-line:no-empty-interface
  export interface ICtx extends ICtxCookies {}
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
