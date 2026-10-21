"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth/client";

function getErrorMessage(error, fallback) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function AuthControls() {
  const dialogRef = useRef(null);
  const [sessionState, setSessionState] = useState("loading");
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("sign-in");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [sessionError, setSessionError] = useState("");

  async function loadSession() {
    setSessionError("");
    setSessionState("loading");

    try {
      const { data, error } = await authClient.getSession();
      if (error) {
        throw error;
      }

      const currentUser = data?.user ?? null;
      setUser(currentUser);
      setSessionState(currentUser ? "signed-in" : "signed-out");
    } catch (error) {
      setSessionError(
        getErrorMessage(error, "Unable to check your sign-in status."),
      );
      setSessionState("error");
    }
  }

  useEffect(() => {
    let isMounted = true;

    authClient
      .getSession()
      .then(({ data, error }) => {
        if (!isMounted) {
          return;
        }
        if (error) {
          throw error;
        }

        const currentUser = data?.user ?? null;
        setUser(currentUser);
        setSessionState(currentUser ? "signed-in" : "signed-out");
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }

        setSessionError(
          getErrorMessage(error, "Unable to check your sign-in status."),
        );
        setSessionState("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function openDialog(nextMode) {
    setMode(nextMode);
    setFeedback("");
    setIsOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");

    try {
      const result =
        mode === "sign-up"
          ? await authClient.signUp.email({
              name: formData.get("name").trim(),
              email,
              password,
            })
          : await authClient.signIn.email({ email, password });

      if (result.error) {
        throw result.error;
      }

      const { data: session, error: sessionError } =
        await authClient.getSession();
      if (sessionError) {
        throw sessionError;
      }

      if (session?.user) {
        setUser(session.user);
        setSessionState("signed-in");
        setIsOpen(false);
        window.dispatchEvent(new Event("birdwatch:auth-change"));
        return;
      }

      if (mode === "sign-in") {
        throw new Error(
          "Sign-in completed, but the session could not be restored. Please try again.",
        );
      }

      setFeedback(
        "Your account was created. If email verification is enabled, check your inbox, then sign in.",
      );
      setMode("sign-in");
    } catch (error) {
      setFeedback(
        getErrorMessage(error, "Authentication failed. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    setIsSubmitting(true);
    setFeedback("");

    try {
      const { error } = await authClient.signOut();
      if (error) {
        throw error;
      }

      setUser(null);
      setSessionState("signed-out");
      window.dispatchEvent(new Event("birdwatch:auth-change"));
    } catch (error) {
      setFeedback(getErrorMessage(error, "Unable to sign out. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sessionState === "loading") {
    return (
      <span className="text-sm font-semibold text-muted" aria-live="polite">
        Checking account...
      </span>
    );
  }

  if (sessionState === "error") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-red-800" role="alert">
          Unable to check your sign-in status.
        </span>
        <button
          className="rounded-[2px] border border-forest px-3 py-2 text-sm font-bold text-forest hover:bg-moss"
          type="button"
          onClick={loadSession}
        >
          Retry
        </button>
        <span className="sr-only" role="alert">
          {sessionError}
        </span>
      </div>
    );
  }

  return (
    <>
      {sessionState === "signed-in" ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span
            className="max-w-40 truncate text-sm font-semibold text-forest"
            title={user?.email}
          >
            {user?.name || user?.email}
          </span>
          <button
            className="inline-block py-2 text-sm font-bold text-forest underline underline-offset-4 transition-colors hover:text-leaf disabled:opacity-60"
            type="button"
            disabled={isSubmitting}
            onClick={handleSignOut}
          >
            {isSubmitting ? "Signing out..." : "Sign out"}
          </button>
        </div>
      ) : (
        <button
          className="inline-flex min-h-9 items-center justify-center rounded-full px-2 py-1 text-sm font-bold text-forest transition-colors hover:text-leaf focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2"
          type="button"
          onClick={() => openDialog("sign-in")}
        >
          Sign in
        </button>
      )}

      {feedback && !isOpen && (
        <span className="text-sm text-red-800" role="alert">
          {feedback}
        </span>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="auth-dialog-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-md border border-line bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/60"
        onClose={() => setIsOpen(false)}
      >
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2
                className="m-0 font-display text-3xl font-normal text-forest"
                id="auth-dialog-title"
              >
                {mode === "sign-up" ? "Create your account" : "Welcome back"}
              </h2>
              <p className="mb-0 mt-2 text-sm text-muted">
                {mode === "sign-up"
                  ? "Sign up to join the Bird Watch community."
                  : "Sign in to your Bird Watch account."}
              </p>
            </div>
            <button
              className="rounded p-2 text-xl leading-none text-muted hover:bg-moss hover:text-forest"
              type="button"
              aria-label="Close sign-in dialog"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {mode === "sign-up" && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-forest" htmlFor="auth-name">
                  Name
                </label>
                <input
                  className="w-full rounded-[2px] border border-line bg-surface px-3 py-2.5 text-ink focus-visible:border-leaf focus-visible:outline-[3px] focus-visible:outline-[rgb(102_132_90_/_20%)]"
                  id="auth-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  minLength={2}
                  required
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-forest" htmlFor="auth-email">
                Email
              </label>
              <input
                className="w-full rounded-[2px] border border-line bg-surface px-3 py-2.5 text-ink focus-visible:border-leaf focus-visible:outline-[3px] focus-visible:outline-[rgb(102_132_90_/_20%)]"
                id="auth-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-sm font-bold text-forest"
                htmlFor="auth-password"
              >
                Password
              </label>
              <input
                className="w-full rounded-[2px] border border-line bg-surface px-3 py-2.5 text-ink focus-visible:border-leaf focus-visible:outline-[3px] focus-visible:outline-[rgb(102_132_90_/_20%)]"
                id="auth-password"
                name="password"
                type="password"
                autoComplete={
                  mode === "sign-up" ? "new-password" : "current-password"
                }
                minLength={8}
                required
              />
            </div>

            {feedback && (
              <p
                className="m-0 text-sm text-forest"
                role="status"
                aria-live="polite"
              >
                {feedback}
              </p>
            )}

            <button
              className="mt-1 inline-flex min-h-11 items-center justify-center rounded-[2px] border border-forest bg-forest px-4 py-2.5 font-bold text-white transition-colors hover:bg-[#193a2c] disabled:cursor-wait disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Please wait..."
                : mode === "sign-up"
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="mb-0 mt-5 text-center text-sm text-muted">
            {mode === "sign-up" ? "Already have an account?" : "New to Bird Watch?"}{" "}
            <button
              className="font-bold text-forest underline underline-offset-2 hover:text-leaf"
              type="button"
              onClick={() => {
                setMode(mode === "sign-up" ? "sign-in" : "sign-up");
                setFeedback("");
              }}
            >
              {mode === "sign-up" ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </dialog>
    </>
  );
}
