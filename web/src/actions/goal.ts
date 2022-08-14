import { goalS } from "../stores"
import type { Result } from "../types"
import { API } from './api'
import { tError } from "./toast"

export async function getGoal(): Promise<Result> {
  goalS.update(() => ({ calories: 2500, protein: 200 }))
  return { ok: true }
  // return {ok: false, err: "500 Internal Server Error"}

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