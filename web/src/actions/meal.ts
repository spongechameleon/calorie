import type { Meal, MealDto, Result } from "../types";
import { lsAddNewMeal, lsDeleteMeal, lsGetMeals, lsUpdateMeal } from "./persistence/localStorage";

export async function getMeals(): Promise<Result> {
  return lsGetMeals()
}

export async function addNewMeal(mealDto: MealDto): Promise<Result> {
  return lsAddNewMeal(mealDto)
}

export async function deleteMeal(id: number): Promise<Result> {
  return lsDeleteMeal(id)
}

export async function updateMeal(meal: Meal): Promise<Result> {
  return lsUpdateMeal(meal)
}