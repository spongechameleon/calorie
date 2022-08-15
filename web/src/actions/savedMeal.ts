import { savedMealsS } from "../stores";
import type { AddMeal, DeleteMeal, GetMeals, Meal, MealDto, UpdateMeal } from "../types";
import { lsGetSavedMeals, lsAddSavedMeal, lsDeleteSavedMeal, lsUpdateSavedMeal } from "./persistence/localStorage";
import { tError, tSuccess } from "./toast";

// All functions act on persistence state, then on application state, e.g.

export const getSavedMeals: GetMeals = async () => {
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

export const addSavedMeal: AddMeal = async (mealDto: MealDto) => {
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

export const updateSavedMeal: UpdateMeal = async (meal: Meal) => {
  const r = lsUpdateSavedMeal(meal)
  if (!r.ok) {
    tError(r.err ? r.err : "Error updating saved meal")
    return { ...r, value: undefined }
  }
  const updatedMeal = r.value

  savedMealsS.update(savedMeals => {
    const i = savedMeals.findIndex(m => m.id === updatedMeal.id)

    if (i !== -1) {
      savedMeals[i] = updatedMeal
      return savedMeals
    }

    // local update fails, reload from persistence
    const r = lsGetSavedMeals()
    return r.value
  })

  tSuccess("Updated meal")
  return { ok: true }
}

export const deleteSavedMeal: DeleteMeal = async (id: number) => {
  const r = lsDeleteSavedMeal(id)
  if (!r.ok) {
    tError(r.err ? r.err : "Error deleting meal")
    return { ...r, value: undefined }
  }
  const deletedId = r.value

  savedMealsS.update(savedMeals => {
    const i = savedMeals.findIndex(m => m.id === deletedId)

    if (i !== -1) {
      savedMeals = savedMeals.slice(0, i).concat(savedMeals.slice(i + 1))
      return savedMeals
    }

    // local update fails, reload from persistence
    const r = lsGetSavedMeals()
    return r.value
  })

  tSuccess("Deleted meal")
  return { ok: true }
}
