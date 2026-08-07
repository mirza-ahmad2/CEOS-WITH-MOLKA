type ErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

/**
 * Lightweight runtime error reporter for React error boundaries.
 * Logs locally; extend with your analytics provider when ready.
 */
export function reportRuntimeError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  if (import.meta.env.DEV) {
    console.error("[runtime]", message, context, error);
  }

  void ({
    message,
    stack: error instanceof Error ? error.stack : undefined,
    filename: window.location.pathname,
    options: {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    } satisfies ErrorOptions,
  });
}
