import { mkDateString, type Id, type Ingredient, type IngredientDto } from "../../types";
import type { Goal, Meal, MealDto, Result } from "../../types";

const KEYS = {
  goal: "goal",
  meal: "meals",
  savedMeals: "savedMeals",
  savedIngredients: "savedIngredients",
}

export function lsManualReset() {
  window.localStorage.clear()
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
  let meals: Meal[] | null = JSON.parse(window.localStorage.getItem(KEYS.meal))
  // If the first meal was on a different day, reset!
  if (
    meals === null
    || (
      typeof meals[0]?.date === "string"
      && meals[0]?.date !== mkDateString()
    )
  ) {
    meals = []
    window.localStorage.setItem(KEYS.meal, JSON.stringify(meals))
  }
  return { ok: true, value: meals }
}

export function lsAddMeal(mealDto: MealDto): Result<Meal> {
  return add(KEYS.meal, mealDto)
}

export function lsUpdateMeal(meal: Meal): Result<Meal> {
  return update(KEYS.meal, meal)
}

export function lsDeleteMeal(id: number): Result<number> {
  return remove(KEYS.meal, id)
}

// SAVED MEAL
export function lsGetSavedMeals(): Result<Meal[]> {
  return get(KEYS.savedMeals)
}

export function lsAddSavedMeal(mealDto: MealDto): Result<Meal> {
  return add(KEYS.savedMeals, mealDto)
}

export function lsUpdateSavedMeal(meal: Meal): Result<Meal> {
  return update(KEYS.savedMeals, meal)
}

export function lsDeleteSavedMeal(id: number): Result<number> {
  return remove(KEYS.savedMeals, id)
}

// SAVED INGREDIENTS
function lsGetSavedIngredients(): Result<Ingredient[]> {
  return get(KEYS.savedIngredients)
}

function lsAddSavedIngredient(ingredientDto: IngredientDto): Result<Ingredient> {
  return add(KEYS.savedIngredients, ingredientDto)
}

function lsUpdateSavedIngredient(ingredient: Ingredient): Result<Ingredient> {
  return update(KEYS.savedIngredients, ingredient)
}

function lsRemoveSavedIngredient(id: number): Result<number> {
  return remove(KEYS.savedIngredients, id)
}

// GENERIC
function get<T>(key: string): Result<T[]> {
  let items: T[] | null = JSON.parse(window.localStorage.getItem(key))
  if (items === null) {
    items = []
    window.localStorage.setItem(key, JSON.stringify(items))
  }
  return { ok: true, value: items }
}

function add<T>(key: string, itemDto: T): Result<Id & T> {
  const r = get<Id & T>(key)
  if (!r.ok) return { ...r, value: undefined }

  const items = r.value
  items.push(
    {
      id: items.length === 0 ? 1 : items[items.length - 1].id + 1,
      ...itemDto
    }
  )
  window.localStorage.setItem(key, JSON.stringify(items))
  return { ok: true, value: items[items.length - 1] }
}

function update<T extends Id>(key: string, item: T): Result<T> {
  const r = get<T>(key)
  if (!r.ok) return { ...r, value: undefined }

  const items = r.value
  const i = items.findIndex(it => it.id === item.id)
  if (i === -1) {
    return { ok: false, err: `${key} item not found` }
  }
  items[i] = item
  window.localStorage.setItem(key, JSON.stringify(items))
  return { ok: true, value: item }
}

function remove<T extends Id>(key: string, id: number): Result<number> {
  const r = get<T>(key)
  if (!r.ok) return { ...r, value: undefined }

  let items = r.value
  const i = items.findIndex(it => it.id === id)
  if (i === -1) {
    return { ok: false, err: `${key} item not found` }
  }
  items = items.slice(0, i).concat(items.slice(i + 1))
  window.localStorage.setItem(key, JSON.stringify(items))
  return { ok: true, value: id }
}