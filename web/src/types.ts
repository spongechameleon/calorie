export type DateString = string;

export function mkDateString(date?: Date) {
  return date ? date.toLocaleDateString() : new Date().toLocaleDateString()
}


export interface Result<T = undefined> {
  ok?: boolean;
  err?: string;
  value?: T;
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  date: DateString;
}

export function mkMeal(): Meal {
  return {
    name: "",
    calories: 0,
    protein: 0,
    date: mkDateString(),
  }
}