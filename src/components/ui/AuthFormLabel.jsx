import React from "react";
import { Root as LabelRoot } from "@radix-ui/react-label";
import { cn } from "../../utils/cn";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelRoot
    ref={ref}
    className={cn(
      "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Label }; // Change from `export default Label;` to `export { Label };`
