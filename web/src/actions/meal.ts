import type { DateString, MealDto, Result } from "../types";
import { lsAddNewMeal, lsGetMeals } from "./persistence/localStorage";

export async function getMeals(date: DateString): Promise<Result> {
  return lsGetMeals(date)
}

export async function addNewMeal(mealDto: MealDto): Promise<Result> {
  return lsAddNewMeal(mealDto)
}