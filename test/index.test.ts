import { Routex, TextBody } from "routex";
import * as request from "supertest";
import cookies from "../src";

it("Gets cookie", () => {
  const app = new Routex();

  app.middleware(cookies());

  app.get("/", ctx => {
    // @ts-ignore
    ctx.body = new TextBody(ctx.cookies.get("name") + ctx.cookies.all.name);
  });

  return request(app.handler)
    .get("/")
    .set("Cookie", "name=john")
    .expect(200)
    .expect("johnjohn");
});

it("Sets cookie", () => {
  const app = new Routex();

  app.middleware(cookies());

  app.get("/", ctx => {
    ctx.cookies.set("name", "john");
    ctx.body = new TextBody("");
  });

  return request(app.handler)
    .get("/")
    .expect(200)
    .expect(res => res.header["set-cookie"] === "name=john");
});

it("Sets cookies with options", () => {
  const app = new Routex();

  app.middleware(cookies());

  app.get("/", ctx => {
    ctx.cookies.set("firstName", "john");
    ctx.cookies.set("lastName", "john", {
      domain: "test.test",
      httpOnly: true
    });

    ctx.body = new TextBody("");
  });

  return (
    request(app.handler)
      .get("/")
      .expect(200)
      // Node 10 and above separates headers when parsing.
      .expect(res =>
        expect(
          [
            "firstName=john",
            "firstName=john,lastName=john; Domain=test.test; HttpOnly"
          ].includes(res.header["set-cookie"][0])
        ).toBeTruthy()
      )
      .expect(res =>
        expect(
          ["lastName=john; Domain=test.test; HttpOnly", undefined].includes(
            res.header["set-cookie"][1]
          )
        ).toBeTruthy()
      )
  );
});
