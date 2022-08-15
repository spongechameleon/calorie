import { mkDateString } from "../../types";
import type { Goal, Meal, MealDto, Result } from "../../types";

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
export function lsGetGoal(): Result<Goal> {
  let goal: Goal | null = JSON.parse(window.localStorage.getItem(KEYS.goal))
  if (goal === null) {
    goal = { calories: 0, protein: 0 }
    window.localStorage.setItem(KEYS.goal, JSON.stringify(goal))
  }
  return { ok: true, value: goal }
}

export function lsUpdateGoal(goal: Goal): Result<Goal> {
  window.localStorage.setItem(KEYS.goal, JSON.stringify(goal))
  return { ok: true, value: goal }
}

// MEAL
export function lsGetMeals(): Result<Meal[]> {
  return getMeals(KEYS.meal, true)
}

export function lsAddMeal(mealDto: MealDto): Result<Meal> {
  return addMeal(mealDto, KEYS.meal, true)
}

export function lsUpdateMeal(meal: Meal): Result<Meal> {
  return updateMeal(meal, KEYS.meal, true)
}

export function lsDeleteMeal(id: number): Result<number> {
  return deleteMeal(id, KEYS.meal, true)
}

// SAVED MEAL
export function lsGetSavedMeals(): Result<Meal[]> {
  return getMeals(KEYS.savedMeals, false)
}

export function lsAddSavedMeal(mealDto: MealDto): Result<Meal> {
  return addMeal(mealDto, KEYS.savedMeals, false)
}

export function lsUpdateSavedMeal(meal: Meal): Result<Meal> {
  return updateMeal(meal, KEYS.savedMeals, false)
}

export function lsDeleteSavedMeal(id: number): Result<number> {
  return deleteMeal(id, KEYS.savedMeals, false)
}

// MEAL GENERIC
function getMeals(key: string, dailyReset: boolean): Result<Meal[]> {
  let meals: Meal[] | null = JSON.parse(window.localStorage.getItem(key))
  // If the first meal was on a different day, reset!
  if (
    meals === null
    || (
      dailyReset
      && typeof meals[0]?.date === "string"
      && meals[0]?.date !== mkDateString()
    )
  ) {
    meals = []
    window.localStorage.setItem(key, JSON.stringify(meals))
  }
  return { ok: true, value: meals }
}

function addMeal(mealDto: MealDto, key: string, dailyReset: boolean): Result<Meal> {
  const r = getMeals(key, dailyReset)
  if (!r.ok) return { ...r, value: undefined }

  const meals = r.value
  meals.push(
    {
      id: meals.length === 0 ? 1 : meals[meals.length - 1].id + 1,
      ...mealDto
    }
  )
  window.localStorage.setItem(key, JSON.stringify(meals))
  return { ok: true, value: meals[meals.length - 1] }

}

function updateMeal(meal: Meal, key: string, dailyReset: boolean): Result<Meal> {
  const r = getMeals(key, dailyReset)
  if (!r.ok) return { ...r, value: undefined }

  const meals = r.value
  const i = meals.findIndex(m => m.id === meal.id)
  if (i === -1) {
    return { ok: false, err: "Meal not found" }
  }
  meals[i] = meal
  window.localStorage.setItem(key, JSON.stringify(meals))
  return { ok: true, value: meal }
}

function deleteMeal(id: number, key: string, dailyReset: boolean): Result<number> {
  const r = getMeals(key, dailyReset)
  if (!r.ok) return { ...r, value: undefined }

  let meals = r.value
  const i = meals.findIndex(m => m.id === id)
  if (i === -1) {
    return { ok: false, err: "Meal not found" }
  }
  meals = meals.slice(0, i).concat(meals.slice(i + 1))
  window.localStorage.setItem(key, JSON.stringify(meals))
  return { ok: true, value: id }
}