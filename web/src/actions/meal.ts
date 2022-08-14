import type { Meal, MealDto, Result } from "../types";
import { lsAddMeal, lsDeleteMeal, lsGetMeals, lsUpdateMeal } from "./persistence/localStorage";

export async function getMeals(): Promise<Result> {
  return lsGetMeals()
}

export async function addMeal(mealDto: MealDto): Promise<Result> {
  return lsAddMeal(mealDto)
}

export async function deleteMeal(id: number): Promise<Result> {
  return lsDeleteMeal(id)
}

export async function updateMeal(meal: Meal): Promise<Result> {
  return lsUpdateMeal(meal)
}