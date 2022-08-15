// Currently not used by anything, window.localStorage is default persistence

import { goalS, mealsS } from "../../stores"
import type { DateString, MealDto, Result } from "../../types"
import { tError, tSuccess } from "../toast"

export const API = {
  routes: {
    goal: "somewhere",
    meal: "somewhere else"
  }
}

export async function apiGetMeals(date: DateString): Promise<Result> {
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

export async function apiAddNewMeal(mealDto: MealDto): Promise<Result> {
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

export async function apiGetGoal(): Promise<Result> {
  try {
    const res = await fetch(API.routes.goal)
    const goal = await res.json()

    if (res.status === 200) {
      goalS.update(() => goal)
      return { ok: true }
    }

    tError(`${res.status} ${res.statusText} fetching goal`)
    return { ok: false }
  } catch (e) {
    tError("Internal error fetching goal")
    return { ok: false }
  }
}
