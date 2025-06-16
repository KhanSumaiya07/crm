"use client"

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}) {
  const classes = ["btn", `btn-${variant}`, size !== "default" ? `btn-${size}` : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
