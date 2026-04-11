import { r as reactExports, j as jsxRuntimeExports, a as cn, C as ChevronDown } from "./index-CtugyttR.js";
import { L as Label } from "./InputField-FRvVB7Ym.js";
const SelectField = reactExports.forwardRef(
  ({
    label,
    error,
    hint,
    required,
    className,
    id,
    options,
    placeholder,
    ...props
  }, ref) => {
    const selectId = id ?? (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          htmlFor: selectId,
          className: "text-sm font-medium text-foreground",
          children: [
            label,
            required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-destructive", "aria-hidden": "true", children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: selectId,
            ref,
            "aria-invalid": !!error,
            "aria-describedby": error ? `${selectId}-error` : hint ? `${selectId}-hint` : void 0,
            className: cn(
              "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8",
              "text-sm text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "transition-colors duration-200",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus:ring-destructive",
              className
            ),
            ...props,
            children: [
              placeholder && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: placeholder }),
              options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })
      ] }),
      hint && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: `${selectId}-hint`, className: "text-xs text-muted-foreground", children: hint }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          id: `${selectId}-error`,
          className: "text-xs text-destructive",
          role: "alert",
          children: error
        }
      )
    ] });
  }
);
SelectField.displayName = "SelectField";
export {
  SelectField as S
};
