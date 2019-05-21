import { CookieSerializeOptions } from "cookie";

declare module "routex" {
  interface ICtx {
    cookies: ICookies;
  }
}

export interface ICookies {
  all: { [key: string]: string };
  get: (prop: string) => string | undefined;
  remove: (prop: string, serializeOptions?: CookieSerializeOptions) => void;
  set: (
    prop: string,
    value: string | null,
    serializeOptions?: CookieSerializeOptions
  ) => void;
}
