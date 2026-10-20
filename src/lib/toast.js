export const TOAST_EVENT = "app:toast";

/** Shows a short confirmation message (rendered by <Toaster />) from anywhere in the app. */
export const toast = (message) => window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
