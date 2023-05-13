# Util for managing complex react classNames

Implements a method `cls: (...classnames: Classname[]) => string`,  
The result is a string of classnames separated by spaces.  
Classname may be a
- `string`
- `boolean` - ignored, may be useful if using a logical expression as a classname
- `undefined` - ignored, may be useful if dealing with optional className prop
- `Record<string, boolean | () => boolean>` - returns a string of classnames separated by spaces. The string includes the keys, which values are true or evaluate to true, others are ignored

```typescript
cls({
  classname1: true,
  classname2: false,
  classname3: () => true,
  classname4: () => false,
}) = "classname1 classname3";
```

## Usage examples

```typescript
interface ComponentProps {
  className?: stirng,
  ...
}
const Component = ({className}: ComponentProps) => {
  return <div className={cls("container", className)}/>
}
```

```typescript
const Component = () => {
  const focused = boolean;
  return <div className={cls("container", focused && "container-focused")} />;
};
```

```typescript
type FocusType = "underline" | "outline" | "none";
const Component = () => {
  const focusType: FocusType;
  return (
    <div
      className={cls("container", {
        "container-underline": focusType === "underline",
        "container-outline": focusType === "outline",
      })}
    />
  );
};
```
