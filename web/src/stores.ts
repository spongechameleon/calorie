import { Writable, writable } from "svelte/store";
import type { Meal } from "./types";

export const mealsS: Writable<Meal[]> = writable([])