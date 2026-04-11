import { r as reactExports, j as jsxRuntimeExports, B as Button, X, a as cn } from "./index-CtugyttR.js";
const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl"
};
function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = "md"
}) {
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent",
      "aria-labelledby": title ? "modal-title" : void 0,
      "data-ocid": "modal-overlay",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/50 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-label": "Fermer la modale"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "relative z-10 w-full bg-card rounded-lg shadow-elevated border border-border",
              "animate-in fade-in zoom-in-95 duration-200",
              sizeMap[size],
              className
            ),
            children: [
              title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: "modal-title",
                    className: "text-lg font-semibold font-display text-foreground",
                    children: title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: onClose,
                    "aria-label": "Fermer",
                    "data-ocid": "modal-close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              !title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: onClose,
                  className: "absolute top-3 right-3 z-10",
                  "aria-label": "Fermer",
                  "data-ocid": "modal-close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children })
            ]
          }
        )
      ]
    }
  );
}
export {
  Modal as M
};
