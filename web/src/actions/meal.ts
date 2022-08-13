import type { DateString, Meal, Result } from "../types";
import { mkDateString } from "../types"
import { mealsS } from "../stores";
import { API } from "./api";

export async function getMeals(date: DateString): Promise<Result> {
  mealsS.update(() => [{
    name: "Overnight Oats",
    calories: 600,
    protein: 46,
    date: mkDateString(),
  }])
  return { ok: true }
  // return {ok: false, err: "500 Internal Server Error"}

  // const url = new URL(API.routes.meal)
  // url.searchParams.append("date", date)

  // try {
  //   const res = await fetch(API.routes.meal)
  //   const meals = await res.json()

  //   if (res.status === 200) {
  //     mealsS.update(() => meals)
  //     return { ok: true }
  //   }
  //   return { ok: false, err: `${res.status} ${res.statusText}` }
  // } catch (e) {
  //   return { ok: false, err: `Internal error: ${e.message}` }
  // }
}

export async function addNewMeal(meal: Meal): Promise<Result> {
  mealsS.update(meals => { meals.push(meal); return meals; })
  return { ok: true }
  // return { ok: false, err: "400 Bad Request" }

  // try {
  //   const res = await fetch(API.routes.meal, {
  //     method: "post",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(meal)
  //   })

  //   if (res.status === 200 || res.status === 201) {
  //     mealsS.update(meals => { meals.push(meal); return meals; })
  //     return { ok: true }
  //   }
  //   return { ok: false, err: `${res.status} ${res.statusText}` }
  // } catch (e) {
  //   return { ok: false, err: `Internal error: ${e.message}` }
  // }
}