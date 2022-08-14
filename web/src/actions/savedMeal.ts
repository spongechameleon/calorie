import type { Meal, MealDto, Result } from "../types";
import { lsGetSavedMeals, lsAddSavedMeal, lsDeleteSavedMeal, lsUpdateSavedMeal } from "./persistence/localStorage";

export async function getSavedMeals(): Promise<Result> {
  return lsGetSavedMeals()
}

export async function addSavedMeal(mealDto: MealDto): Promise<Result> {
  return lsAddSavedMeal(mealDto)
}

export async function deleteSavedMeal(id: number): Promise<Result> {
  return lsDeleteSavedMeal(id)
}

export async function updateSavedMeal(meal: Meal): Promise<Result> {
  return lsUpdateSavedMeal(meal)
}