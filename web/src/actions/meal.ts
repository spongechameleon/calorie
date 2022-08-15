import { mealsS } from "../stores";
import type { AddMeal, DeleteMeal, GetMeals, Meal, UpdateMeal } from "../types";
import { lsAddMeal, lsDeleteMeal, lsGetMeals, lsUpdateMeal } from "./persistence/localStorage";
import { tError, tSuccess } from "./toast";

// All functions act on persistence state, then on application state, e.g.

export const getMeals: GetMeals = async () => {
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

export const addMeal: AddMeal = async (mealDto) => {
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

export const updateMeal: UpdateMeal = async (meal: Meal) => {
  const r = lsUpdateMeal(meal)
  if (!r.ok) {
    tError(r.err ? r.err : "Error updating meal")
    return { ...r, value: undefined }
  }
  const updatedMeal = r.value

  mealsS.update(meals => {
    const i = meals.findIndex(m => m.id === updatedMeal.id)

    if (i !== -1) {
      meals[i] = meal
      return meals
    }

    // local update fails, reload from persistence
    const r = lsGetMeals()
    return r.value
  })

  tSuccess("Updated meal")
  return { ok: true }
}

export const deleteMeal: DeleteMeal = async (id: number) => {
  const r = lsDeleteMeal(id)
  if (!r.ok) {
    tError(r.err ? r.err : "Error deleting meal")
    return { ...r, value: undefined }
  }
  const deletedId = r.value

  mealsS.update(meals => {
    const i = meals.findIndex(m => m.id === deletedId)

    if (i !== -1) {
      meals = meals.slice(0, i).concat(meals.slice(i + 1))
      return meals
    }

    // local update fails, reload from persistence
    const r = lsGetMeals()
    return r.value
  })

  tSuccess("Deleted meal")
  return { ok: true }
}
