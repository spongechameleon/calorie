import { goalS } from "../stores"
import type { Goal, Result } from "../types"
import { lsGetGoal, lsUpdateGoal } from "./persistence/localStorage"
import { tError, tSuccess } from "./toast"

// All functions act on persistence state, then on application state, e.g.

export async function getGoal(): Promise<Result> {
  // persistence
  const r = lsGetGoal()
  if (!r.ok) {
    tError(r.err ? r.err : "Error retrieving goal")
    return { ...r, value: undefined }
  }

  // application
  goalS.update(() => r.value)
  return { ok: true }
}

export async function updateGoal(goal: Goal): Promise<Result> {
  const r = lsUpdateGoal(goal)
  if (!r.ok) {
    tError(r.err ? r.err : "Error updating goal")
    return { ...r, value: undefined }
  }

  goalS.update(() => r.value)
  tSuccess("Updated goal")
  return { ok: true }
}