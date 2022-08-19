import type { Ingredient, IngredientDto } from "../types";
import { savedIngredientsS } from "../stores";
import { lsAddSavedIngredient, lsGetSavedIngredients, lsRemoveSavedIngredient, lsUpdateSavedIngredient } from "./persistence/localStorage";
import { tError, tSuccess } from "./toast";

// All functions act on persistence state, then on application state, e.g.

export const getSavedIngredients = async () => {
  // persistence
  const r = lsGetSavedIngredients()
  if (!r.ok) {
    tError(r.err ? r.err : "Error retrieving saved ingredients")
    return { ...r, value: undefined }
  }

  // application
  savedIngredientsS.update(() => r.value)

  return { ok: true }
}

export const addSavedIngedient = async (ingredientDto: IngredientDto) => {
  const r = lsAddSavedIngredient(ingredientDto)
  if (!r.ok) {
    tError(r.err ? r.err : "Error saving meal")
    return { ...r, value: undefined }
  }

  savedIngredientsS.update(savedIngredients => {
    savedIngredients.push(r.value)
    return savedIngredients
  })

  tSuccess("Saved ingredient")
  return { ok: true }
}

export const updateSavedIngredient = async (ingredient: Ingredient) => {
  const r = lsUpdateSavedIngredient(ingredient)
  if (!r.ok) {
    tError(r.err ? r.err : "Error updating saved ingredient")
    return { ...r, value: undefined }
  }
  const updatedIngredient = r.value

  savedIngredientsS.update(savedIngredients => {
    const i = savedIngredients.findIndex(igr => igr.id === updatedIngredient.id)

    if (i !== -1) {
      savedIngredients[i] = updatedIngredient
      return savedIngredients
    }

    // local update fails, reload from persistence
    const r = lsGetSavedIngredients()
    return r.value
  })

  tSuccess("Updated ingredient")
  return { ok: true }
}

export const removeSavedIngredient = async (id: number) => {
  const r = lsRemoveSavedIngredient(id)
  if (!r.ok) {
    tError(r.err ? r.err : "Error deleting ingredient")
    return { ...r, value: undefined }
  }
  const deletedId = r.value

  savedIngredientsS.update(savedIngredients => {
    const i = savedIngredients.findIndex(igr => igr.id === deletedId)

    if (i !== -1) {
      savedIngredients = savedIngredients.slice(0, i).concat(savedIngredients.slice(i + 1))
      return savedIngredients
    }

    // local update fails, reload from persistence
    const r = lsGetSavedIngredients()
    return r.value
  })

  tSuccess("Deleted ingredient")
  return { ok: true }
}
