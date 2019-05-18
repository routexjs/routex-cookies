import {
  CookieParseOptions,
  CookieSerializeOptions,
  parse,
  serialize
} from "cookie";
import { Middleware } from "routex";
import { ICookies } from "./types/routex";

interface ICookieOptions {
  parse?: CookieParseOptions;
  serialize?: CookieSerializeOptions;
}

interface ICookieToSet {
  prop: string;
  value: string;
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
      set: (
        prop: string,
        value: string,
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
            serialize(prop, value, {
              ...options.serialize,
              ...serializeOptions
            })
          )
        );
      }
    };
  };
}
