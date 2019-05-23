# Routex Cookies [![npm](https://img.shields.io/npm/v/@routex/cookies.svg)](https://www.npmjs.com/package/@routex/cookies) [![Travis CI](https://img.shields.io/travis/com/Cretezy/routex-cookies.svg)](https://travis-ci.com/Cretezy/routex-cookies) [![Codecov](https://img.shields.io/codecov/c/github/Cretezy/routex-cookies.svg)](https://codecov.io/gh/Cretezy/routex-cookies) [![Greenkeeper badge](https://badges.greenkeeper.io/Cretezy/routex-cookies.svg)](https://greenkeeper.io/)

Cookies for [Routex](https://www.npmjs.com/package/routex).

## Usage

Install:

```bash
yarn add @routex/cookies
# or
npm add @routex/cookies
```

Setup your app:

```js
const { Routex, TextBody } = require("routex");
const cookies = require("@routex/cookies");

const port = process.env.PORT || 3000;
const app = new Routex();

app.use(cookies());

app.get("/", ctx => {
  const name = ctx.cookies.get("name");
  if (!name) {
    ctx.cookies.set("name", "john");
  }

  ctx.body = new TextBody("Set name cookie");
});

app.listen(port).then(() => console.log(`Listening on ${port}`));
```

You may also pass options to the `cookies()` middleware:

- [`parse`](https://www.npmjs.com/package/cookie#options):

  | Option   | Type                 |
  | -------- | -------------------- |
  | `decode` | `(string) => string` |

- [`serialize`](https://www.npmjs.com/package/cookie#options-1):

  | Option     | Type                         |
  | ---------- | ---------------------------- |
  | `domain`   | `string`                     |
  | `encode`   | `(string) => string`         |
  | `expires`  | `Date`                       |
  | `httpOnly` | `boolean`                    |
  | `maxAge`   | `number`                     |
  | `path`     | `string`                     |
  | `sameSite` | `boolean | 'lax' | 'strict'` |
  | `secure`   | `boolean`                    |

## Get

You can use `ctx.cookies.get(cookie)` or `ctx.cookies.all` to get cookies:

```js
app.get("/a", ctx => {
  const name = ctx.cookies.get("name");
});
app.get("/b", ctx => {
  const { name } = ctx.cookies.all;
});
```

## Set

You can use `ctx.cookies.set(cookie, value)` set cookies:

```js
app.get("/", ctx => {
  ctx.cookies.set("name", "john");
});
```

You may also pass [options](https://www.npmjs.com/package/cookie#options-1) (see link for more details) as a third parameters:

| Option     | Type                         |
| ---------- | ---------------------------- |
| `domain`   | `string`                     |
| `encode`   | `(string) => string`         |
| `expires`  | `Date`                       |
| `httpOnly` | `boolean`                    |
| `maxAge`   | `number`                     |
| `path`     | `string`                     |
| `sameSite` | `boolean | 'lax' | 'strict'` |
| `secure`   | `boolean`                    |

## Support

We support all currently active and maintained [Node LTS versions](https://github.com/nodejs/Release), include current Node versions.

Please file feature requests and bugs at the [issue tracker](https://github.com/Cretezy/routex-cookies/issues).
