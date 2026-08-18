import { DECK_GO_EVENT, SLIDE_COUNT } from "@/lib/slides";

export type DeckOrigin = "scroll" | "jump";

export type DeckGoDetail = {
  index: number;
  origin: DeckOrigin;
  fromHistory?: boolean;
};

const SCROLL_DEBOUNCE_MS = 90;
const LOCK_FAILSAFE_MS = 1400;

let activeSlide = 0;
let locked = false;
let lockTimer = 0;
let lastScrollAt = 0;

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

  if (index === activeSlide && !fromHistory) {
    return;
  }

  if (!fromHistory && locked) {
    return;
  }

  if (!fromHistory && origin === "scroll") {
    const now = performance.now();
    if (now - lastScrollAt < SCROLL_DEBOUNCE_MS) {
      return;
    }
    lastScrollAt = now;
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
