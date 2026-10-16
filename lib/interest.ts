/**
 * Tiny pub/sub that lets service and product CTAs pre-select an "area of interest" in the lead form.
 * The form is lazy-loaded, so a request made before it mounts is kept and picked up on mount.
 */

type Listener = (interest: string) => void;

const listeners = new Set<Listener>();
let pending: string | null = null;

export function requestInterest(interest: string) {
  if (listeners.size === 0) {
    pending = interest;
    return;
  }
  listeners.forEach((listener) => listener(interest));
}

export function subscribeToInterest(listener: Listener) {
  listeners.add(listener);
  if (pending) {
    listener(pending);
    pending = null;
  }
  return () => {
    listeners.delete(listener);
  };
}
