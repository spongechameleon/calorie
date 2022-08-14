import { pageS } from "../stores";

export const PAGES = {
  main: "main",
  config: "config",
}

export function goToMain() {
  pageS.update(() => PAGES.main)
}

export function goToConfig() {
  pageS.update(() => PAGES.config)
}