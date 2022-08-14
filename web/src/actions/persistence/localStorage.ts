import { goalS, mealsS, savedMealsS } from "../../stores";
import { mkDateString } from "../../types";
import type { Goal, Meal, MealDto, Result } from "../../types";
import { tSuccess } from "../toast";
import type { Writable } from "svelte/store";

const KEYS = {
  meal: "meals",
  savedMeals: "savedMeals",
  goal: "goal",
}

export function lsManualReset() {
  window.localStorage.removeItem(KEYS.goal)
  window.localStorage.removeItem(KEYS.meal)
  window.localStorage.removeItem(KEYS.savedMeals)
  window.location.reload()
}

// GOAL
export function lsGetGoal(): Result {
  const goal: Goal | null = JSON.parse(window.localStorage.getItem(KEYS.goal))
  goalS.update(() => {
    if (goal === null) {
      const def: Goal = { calories: 0, protein: 0 }
      window.localStorage.setItem(KEYS.goal, JSON.stringify(def))
      return def
    }
    return goal
  })
  return { ok: true }
}

export function lsUpdateGoal(goal: Goal): Result {
  goalS.update(() => {
    window.localStorage.setItem(KEYS.goal, JSON.stringify(goal))
    return goal
  })
  return { ok: true }
}

// MEAL
export function lsGetMeals(): Result {
  return getMeals(KEYS.meal, mealsS, true)
}

export function lsAddMeal(mealDto: MealDto): Result {
  return addMeal(mealDto, KEYS.meal, mealsS)
}

export function lsUpdateMeal(meal: Meal): Result {
  return updateMeal(meal, KEYS.meal, mealsS)
}

export function lsDeleteMeal(id: number): Result {
  return deleteMeal(id, KEYS.meal, mealsS)
}

// SAVED MEAL
export function lsGetSavedMeals(): Result {
  return getMeals(KEYS.savedMeals, savedMealsS, false)
}

export function lsAddSavedMeal(mealDto: MealDto): Result {
  return addMeal(mealDto, KEYS.savedMeals, savedMealsS)
}

export function lsUpdateSavedMeal(meal: Meal): Result {
  return updateMeal(meal, KEYS.savedMeals, savedMealsS)
}

export function lsDeleteSavedMeal(id: number): Result {
  return deleteMeal(id, KEYS.savedMeals, savedMealsS)
}

// GENERIC
function getMeals(key: string, mealStore: Writable<Meal[]>, dailyReset: boolean): Result {
  const meals: Meal[] | null = JSON.parse(window.localStorage.getItem(key))
  mealStore.update(() => {
    // If the first meal was on a different day, reset!
    if (
      meals === null
      || (
        dailyReset
        && typeof meals[0]?.date === "string"
        && meals[0]?.date !== mkDateString()
      )
    ) {
      const def: Meal[] = []
      window.localStorage.setItem(key, JSON.stringify(def))
      return def
    }
    return meals
  })
  return { ok: true }
}

function addMeal(mealDto: MealDto, key: string, mealStore: Writable<Meal[]>): Result {
  mealStore.update(meals => {
    meals.push(
      {
        id: meals.length === 0 ? 1 : meals[meals.length - 1].id + 1,
        ...mealDto
      }
    );
    window.localStorage.setItem(key, JSON.stringify(meals))
    return meals;
  })
  tSuccess("Meal added")
  return { ok: true }
}

function updateMeal(meal: Meal, key: string, mealStore: Writable<Meal[]>): Result {
  let ok = true
  mealStore.update(meals => {
    const i = meals.findIndex(m => m.id === meal.id)
    if (i === -1) {
      ok = false
    } else {
      meals[i] = meal
      window.localStorage.setItem(key, JSON.stringify(meals))
    }
    return meals
  })
  return { ok }
}

function deleteMeal(id: number, key: string, mealStore: Writable<Meal[]>): Result {
  let ok = true
  mealStore.update(meals => {
    const i = meals.findIndex(m => m.id === id)
    if (i === -1) {
      ok = false
    } else {
      meals = meals.slice(0, i).concat(meals.slice(i + 1))
      window.localStorage.setItem(key, JSON.stringify(meals))
    }
    return meals
  })
  return { ok }
}