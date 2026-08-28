import { DECK_GO_EVENT, SLIDE_COUNT } from "@/lib/slides";

export type DeckOrigin = "scroll" | "jump";

export type DeckGoDetail = {
  index: number;
  origin: DeckOrigin;
  fromHistory?: boolean;
};

const SCROLL_DEBOUNCE_MS = 80;
const SCROLL_INERTIA_MS = 380;
const LOCK_FAILSAFE_MS = 1100;

let activeSlide = 0;
let locked = false;
let lockTimer = 0;
let lastScrollAt = 0;
let scrollGateUntil = 0;

export function getActiveSlide() {
  return activeSlide;
}

export function setActiveSlide(index: number) {
  activeSlide = index;
}

export function isDeckLocked() {
  return locked;
}

export function lockDeck(ms = LOCK_FAILSAFE_MS) {
  locked = true;
  scrollGateUntil = Math.max(scrollGateUntil, performance.now() + ms + SCROLL_INERTIA_MS);
  window.clearTimeout(lockTimer);
  lockTimer = window.setTimeout(() => {
    locked = false;
  }, ms);
}

export function unlockDeck() {
  locked = false;
  window.clearTimeout(lockTimer);
}

export function goTo(
  index: number,
  origin: DeckOrigin = "jump",
  fromHistory = false,
) {
  if (index < 0 || index >= SLIDE_COUNT) {
    return;
  }

  // Jump (dots/menu) must always reach the deck. A stale activeSlide of 0
  // was swallowing the home item after HMR or a hash mismatch.
  if (origin === "scroll" && index === activeSlide && !fromHistory) {
    return;
  }

  if (!fromHistory && origin === "scroll") {
    const now = performance.now();
    if (locked || now < scrollGateUntil) {
      return;
    }
    if (now - lastScrollAt < SCROLL_DEBOUNCE_MS) {
      return;
    }
    lastScrollAt = now;
    scrollGateUntil = now + SCROLL_INERTIA_MS;
  }

  window.dispatchEvent(
    new CustomEvent<DeckGoDetail>(DECK_GO_EVENT, {
      detail: { index, origin, fromHistory },
    }),
  );
}

export function next() {
  goTo(activeSlide + 1, "scroll");
}

export function previous() {
  goTo(activeSlide - 1, "scroll");
}
