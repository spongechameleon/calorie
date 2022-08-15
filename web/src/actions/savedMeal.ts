import { savedMealsS } from "../stores";
import type { Meal, MealDto, Result } from "../types";
import { lsGetSavedMeals, lsAddSavedMeal, lsDeleteSavedMeal, lsUpdateSavedMeal } from "./persistence/localStorage";
import { tError, tSuccess } from "./toast";

// All functions act on persistence state, then on application state, e.g.

export async function getSavedMeals(): Promise<Result> {
  // persistence
  const r = lsGetSavedMeals()
  if (!r.ok) {
    tError(r.err ? r.err : "Error retrieving saved meals")
    return { ...r, value: undefined }
  }

  // application
  savedMealsS.update(() => r.value)
  return { ok: true }
}

export async function addSavedMeal(mealDto: MealDto): Promise<Result> {
  const r = lsAddSavedMeal(mealDto)
  if (!r.ok) {
    tError(r.err ? r.err : "Error saving meal")
    return { ...r, value: undefined }
  }

  savedMealsS.update(savedMeals => {
    savedMeals.push(r.value)
    return savedMeals
  })
  tSuccess("Saved meal")
  return { ok: true }
}

export async function updateSavedMeal(meal: Meal): Promise<Result> {
  const r = lsUpdateSavedMeal(meal)
  if (!r.ok) {
    tError(r.err ? r.err : "Error updating saved meal")
    return { ...r, value: undefined }
  }

  const updatedMeal = r.value
  let ok = true
  savedMealsS.update(savedMeals => {
    const i = savedMeals.findIndex(m => m.id === updatedMeal.id)
    if (i !== -1) {
      savedMeals[i] = updatedMeal
      tSuccess("Updated meal")
    } else {
      ok = false
      tError("Unable to update meal")
    }
    return savedMeals
  })
  return { ok }
}

export async function deleteSavedMeal(id: number): Promise<Result> {
  const r = lsDeleteSavedMeal(id)
  if (!r.ok) {
    tError(r.err ? r.err : "Error deleting meal")
    return { ...r, value: undefined }
  }

  const deletedId = r.value
  let ok = true
  savedMealsS.update(savedMeals => {
    const i = savedMeals.findIndex(m => m.id === deletedId)
    if (i !== -1) {
      savedMeals = savedMeals.slice(0, i).concat(savedMeals.slice(i + 1))
      tSuccess("Deleted meal")
    } else {
      ok = false
      tError("Unable to delete meal")
    }
    return savedMeals
  })
  return { ok }
}
