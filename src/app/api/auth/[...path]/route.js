import { getAuth } from "@/lib/auth/server";

let handlers;

function handle(method) {
  return (...args) => {
    handlers ??= getAuth().handler();
    return handlers[method](...args);
  };
}

export const GET = handle("GET");
export const POST = handle("POST");
export const PUT = handle("PUT");
export const DELETE = handle("DELETE");
export const PATCH = handle("PATCH");
