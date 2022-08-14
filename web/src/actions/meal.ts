import type { DateString, Meal, MealDto, Result } from "../types";
import { mkDateString } from "../types"
import { mealsS } from "../stores";
import { API } from "./api";
import { tError, tSuccess } from "./toast";

export async function getMeals(date: DateString): Promise<Result> {
  mealsS.update(() => [{
    id: 1,
    name: "Overnight Oats",
    calories: 600,
    protein: 46,
    date: mkDateString(),
  }])
  return { ok: true }
  // return {ok: false, err: "500 Internal Server Error"}

  const url = new URL(API.routes.meal)
  url.searchParams.append("date", date)

  try {
    const res = await fetch(url)
    const meals = await res.json()

    if (res.status === 200) {
      mealsS.update(() => meals)
      return { ok: true }
    }

    tError(`${res.status} ${res.statusText} fetching meals`)
    return { ok: false }
  } catch (e) {
    tError("Internal error fetching meals")
    return { ok: false }
  }
}

export async function addNewMeal(mealDto: MealDto): Promise<Result> {
  mealsS.update(meals => {
    meals.push(
      {
        id: meals[meals.length - 1].id + 1,
        ...mealDto
      }
    );
    return meals;
  })
  return { ok: true }
  // return { ok: false, err: "400 Bad Request" }

  try {
    const res = await fetch(API.routes.meal, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mealDto)
    })
    const newMeal = await res.json()

    if (res.status === 200 || res.status === 201) {
      tSuccess("Meal added")
      mealsS.update(meals => { meals.push(newMeal); return meals; })
      return { ok: true }
    }

    tError(`${res.status} ${res.statusText} adding new meal`)
    return { ok: false }
  } catch (e) {
    tError("Internal error adding new meal")
    return { ok: false }
  }
}