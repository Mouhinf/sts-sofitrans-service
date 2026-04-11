import { r as reactExports, j as jsxRuntimeExports, a as cn } from "./index-CtugyttR.js";
import { L as Label } from "./InputField-FRvVB7Ym.js";
const TextareaField = reactExports.forwardRef(
  ({ label, error, hint, required, className, id, ...props }, ref) => {
    const textareaId = id ?? (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          htmlFor: textareaId,
          className: "text-sm font-medium text-foreground",
          children: [
            label,
            required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-destructive", "aria-hidden": "true", children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: textareaId,
          ref,
          "aria-invalid": !!error,
          "aria-describedby": error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : void 0,
          className: cn(
            "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "transition-colors duration-200 resize-y",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus:ring-destructive",
            className
          ),
          ...props
        }
      ),
      hint && !error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          id: `${textareaId}-hint`,
          className: "text-xs text-muted-foreground",
          children: hint
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          id: `${textareaId}-error`,
          className: "text-xs text-destructive",
          role: "alert",
          children: error
        }
      )
    ] });
  }
);
TextareaField.displayName = "TextareaField";
export {
  TextareaField as T
};
