import { getGoal } from "./goal";
import { getMeals } from "./meal";
import { getSavedMeals } from "./savedMeal";

export function initData() {
  getGoal();
  getMeals();
  getSavedMeals();
}