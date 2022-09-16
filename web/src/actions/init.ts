import { getGoal } from "./goal";
import { getMeals } from "./meal";
import { getSavedMeals } from "./savedMeal";
import { getSavedIngredients } from "./ingredient";

export function initData() {
  getGoal();
  getMeals();
  getSavedMeals();
  getSavedIngredients();
}