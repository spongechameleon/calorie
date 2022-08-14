import type { Goal, Result } from "../types"
import { lsGetGoal, lsUpdateGoal } from "./persistence/localStorage"

export async function getGoal(): Promise<Result> {
  return lsGetGoal()
}

export async function updateGoal(goal: Goal): Promise<Result> {
  return lsUpdateGoal(goal)
}