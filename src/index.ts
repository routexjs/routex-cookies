import {
  CookieParseOptions,
  CookieSerializeOptions,
  parse,
  serialize
} from "cookie";
import { Middleware } from "routex";
import { ICookies } from "./types/routex";
// tslint:disable-next-line:no-duplicate-imports
import "./types/routex";

interface ICookieOptions {
  parse?: CookieParseOptions;
  serialize?: CookieSerializeOptions;
}

interface ICookieToSet {
  prop: string;
  value: string | null;
  serializeOptions?: CookieSerializeOptions;
}

export default function(options: ICookieOptions = {}): Middleware {
  return ctx => {
    // Get cookies from headers
    const { cookie } = ctx.req.headers;

    // Parse cookies
    const parsedCookies = cookie ? parse(cookie, options.parse) : {};

    const cookiesToSet: ICookieToSet[] = [];

    const cookies: ICookies = {
      all: parsedCookies,
      get: (prop: string) => parsedCookies[prop],
      remove: (prop: string, serializeOptions?: CookieSerializeOptions) =>
        cookiesToSet.push({ prop, value: null, serializeOptions }),
      set: (
        prop: string,
        value: string | null,
        serializeOptions?: CookieSerializeOptions
      ) => cookiesToSet.push({ prop, value, serializeOptions })
    };

    // Attach to ctx
    ctx.cookies = cookies;

    return () => {
      if (cookiesToSet.length) {
        // Set cookies
        ctx.res.setHeader(
          "Set-Cookie",
          cookiesToSet.map<string>(({ prop, value, serializeOptions }) =>
            serialize(prop, value || "", {
              ...(!value && { expires: new Date(0) }),
              ...options.serialize,
              ...serializeOptions
            })
          )
        );
      }
    };
  };
}
