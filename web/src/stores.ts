import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Goal, Meal } from "./types";

export const mealsS: Writable<Meal[]> = writable([])

export const goalS: Writable<Goal> = writable({ calories: 0, protein: 0 })

export const savedMealsS: Writable<Meal[]> = writable([])