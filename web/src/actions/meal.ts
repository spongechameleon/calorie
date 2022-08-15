import { mealsS } from "../stores";
import type { Meal, MealDto, Result } from "../types";
import { lsAddMeal, lsDeleteMeal, lsGetMeals, lsUpdateMeal } from "./persistence/localStorage";
import { tError, tSuccess } from "./toast";

// All functions act on persistence state, then on application state, e.g.

export async function getMeals(): Promise<Result> {
  // persistence
  const r = lsGetMeals()
  if (!r.ok) {
    tError(r.err ? r.err : "Error retrieving meals")
    return { ...r, value: undefined }
  }

  // application
  mealsS.update(() => r.value)
  return { ok: true }
}

export async function addMeal(mealDto: MealDto): Promise<Result> {
  const r = lsAddMeal(mealDto)
  if (!r.ok) {
    tError(r.err ? r.err : "Error adding meal")
    return { ...r, value: undefined }
  }

  mealsS.update(meals => {
    meals.push(r.value)
    return meals
  })
  tSuccess("Added meal")
  return { ok: true }
}

export async function updateMeal(meal: Meal): Promise<Result> {
  const r = lsUpdateMeal(meal)
  if (!r.ok) {
    tError(r.err ? r.err : "Error updating meal")
    return { ...r, value: undefined }
  }

  const updatedMeal = r.value
  let ok = true
  mealsS.update(meals => {
    const i = meals.findIndex(m => m.id === updatedMeal.id)
    if (i !== -1) {
      meals[i] = meal
      tSuccess("Updated meal")
    } else {
      ok = false
      tError("Unable to update meal")
    }
    return meals
  })
  return { ok }
}

export async function deleteMeal(id: number): Promise<Result> {
  const r = lsDeleteMeal(id)
  if (!r.ok) {
    tError(r.err ? r.err : "Error deleting meal")
    return { ...r, value: undefined }
  }

  const deletedId = r.value
  let ok = true
  mealsS.update(meals => {
    const i = meals.findIndex(m => m.id === deletedId)
    if (i !== -1) {
      meals = meals.slice(0, i).concat(meals.slice(i + 1))
      tSuccess("Deleted meal")
    } else {
      ok = false
      tError("Unable to delete meal")
    }
    return meals
  })
  return { ok }
}
