import React from "react";

// ? https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
export function createCtx<A extends {} | null>() {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (c === undefined) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx] as const; // 'as const' makes TypeScript infer a tuple
}
