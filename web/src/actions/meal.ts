import type { MealDto, Result } from "../types";
import { lsAddNewMeal, lsGetMeals } from "./persistence/localStorage";

export async function getMeals(): Promise<Result> {
  return lsGetMeals()
}

export async function addNewMeal(mealDto: MealDto): Promise<Result> {
  return lsAddNewMeal(mealDto)
}