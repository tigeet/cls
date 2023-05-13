type Predicate = () => boolean;
type Optional = Record<string, boolean | Predicate>;
type Classname = string | undefined | boolean | Optional;
type Classnames = Array<Classname>;

const flatten = (clsObject: Optional): string[] => {
  const flat = [];
  for (const [cls, value] of Object.entries(clsObject)) {
    if (typeof value === "boolean") value && flat.push(cls);
    else if (typeof value === "function") value() && flat.push(cls);
  }
  return flat;
};

const cls = (...classnames: Classnames): string => {
  const filtered: string[] = [];
  classnames.forEach((classname, i) => {
    if (!classname) return;
    switch (typeof classname) {
      case "string":
        filtered.push(classname);
        break;
      case "boolean":
        break;
      case "object":
        filtered.push(...flatten(classname));
        break;
      default:
        throw new Error(`Error at classname #${i}: Type not supported`);
    }
  });

  return filtered.join(" ");
};

export { cls };
