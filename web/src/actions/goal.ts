import type { Result } from "../types"
import { lsGetGoal } from "./persistence/localStorage"

export async function getGoal(): Promise<Result> {
  return lsGetGoal()
}