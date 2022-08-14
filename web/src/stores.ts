import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Goal, Meal } from "./types";
import { PAGES } from "./actions/page";

export const mealsS: Writable<Meal[]> = writable([])

export const goalS: Writable<Goal> = writable({ calories: 0, protein: 0 })

export const savedMealsS: Writable<Meal[]> = writable([])

export const pageS: Writable<string> = writable(PAGES.main)