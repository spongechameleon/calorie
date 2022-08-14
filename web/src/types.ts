export interface Result<T = undefined> {
  ok?: boolean;
  err?: string;
  value?: T;
}

export type DateString = string;

export function mkDateString(date?: Date) {
  return date ? date.toLocaleDateString() : new Date().toLocaleDateString()
}

export interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  date: DateString;
}

export interface MealDto {
  name: string;
  calories: number;
  protein: number;
  date: DateString;
}

export function mkMealDto(): MealDto {
  return {
    name: "",
    calories: 0,
    protein: 0,
    date: mkDateString(),
  }
}

export interface Goal {
  calories: number;
  protein: number;
}