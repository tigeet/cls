import { cls } from "./cls";

test("Plain string is not modified", () => {
  expect(cls("classname")).toBe("classname");
});

test("Optional strings are ommited, if evaluates to false", () => {
  expect(cls(false && "classname")).toBe("");

  expect(cls(true && "classname")).toBe("classname");

  expect(cls(true && "classname1", false && "classname2")).toBe("classname1");
});

test("Undefined arguments are ignored", () => {
  expect(cls(false)).toBe("");

  expect(cls(undefined, "classname")).toBe("classname");
});

// Optional argument: Record<string, boolean | () => boolean)>
test("Optional arguments are ignored, if evaluated to false", () => {
  expect(cls({ classname1: true, classname2: false })).toBe("classname1");

  expect(cls({ classname2: () => false, classname3: () => true })).toBe(
    "classname3"
  );
});

test("All variants can be used at once, the results are joined by one space", () => {
  expect(
    cls("classname1", true && "classname2", {
      classname3: true,
      classname4: () => true,
    })
  ).toBe("classname1 classname2 classname3 classname4");

  expect(
    cls(false, undefined, false && "classname2", {
      classname2: false,
      classname3: () => false,
    })
  ).toBe("");
});
