import { goalS, mealsS } from "../../stores";
import { mkDateString } from "../../types";
import type { Goal, Meal, MealDto, Result } from "../../types";
import { tSuccess } from "../toast";

export function lsManualReset() {
  window.localStorage.setItem("calorie_goal", JSON.stringify(
    { calories: 2500, protein: 200 }
  ))
  window.localStorage.removeItem("calorie_meals")
  window.location.reload()
}

export function lsGetGoal(): Result {
  const goal: Goal | null = JSON.parse(window.localStorage.getItem("calorie_goal"))
  goalS.update(() => {
    if (goal === null) {
      const def: Goal = { calories: 0, protein: 0 }
      window.localStorage.setItem("calorie_goal", JSON.stringify(def))
      return def
    }
    return goal
  })
  return { ok: true }
}

export function lsGetMeals(): Result {
  const meals: Meal[] | null = JSON.parse(window.localStorage.getItem("calorie_meals"))
  mealsS.update(() => {
    // If the first meal was on a different day, reset!
    if (
      meals === null
      || (
        typeof meals[0]?.date === "string"
        && meals[0]?.date !== mkDateString()
      )
    ) {
      const def: Meal[] = []
      window.localStorage.setItem("calorie_meals", JSON.stringify(def))
      return def
    }
    return meals
  })
  return { ok: true }
}

export function lsAddNewMeal(mealDto: MealDto): Result {
  mealsS.update(meals => {
    meals.push(
      {
        id: meals.length === 0 ? 1 : meals[meals.length - 1].id + 1,
        ...mealDto
      }
    );
    window.localStorage.setItem("calorie_meals", JSON.stringify(meals))
    return meals;
  })
  tSuccess("Meal added")
  return { ok: true }
}