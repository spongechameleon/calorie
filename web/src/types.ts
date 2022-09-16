export interface Result<T = undefined> {
  ok?: boolean;
  err?: string;
  value?: T;
}

export type DateString = string;

export function mkDateString(date?: Date) {
  return date ? date.toLocaleDateString() : new Date().toLocaleDateString()
}

export interface Id {
  id: number;
}

export interface Goal {
  calories: number;
  protein: number;
}

export interface Meal extends Id, MealDto { }

export interface MealDto {
  name: string;
  calories: number;
  protein: number;
  date: DateString;
}

export type GetMeals = () => Promise<Result>;
export type AddMeal = (mealDto: MealDto) => Promise<Result>;
export type UpdateMeal = (meal: Meal) => Promise<Result>;
export type DeleteMeal = (id: number) => Promise<Result>;

export function mkMealDto(): MealDto {
  return {
    name: "",
    calories: 0,
    protein: 0,
    date: mkDateString(),
  }
}

export enum ServingUnit {
  gram = "g",
  ounce = "oz",
  milliliter = "ml",
}

export interface Ingredient extends Id, IngredientDto { }

export interface IngredientDto {
  name: string;
  servingSize: number;
  servingSizeUnit: ServingUnit;
  servingCalories: number;
  servingProtein: number;
}

export function mkIngredientDto(): IngredientDto {
  return {
    name: "",
    servingSize: 0,
    servingSizeUnit: ServingUnit.gram,
    servingCalories: 0,
    servingProtein: 0,
  }
}
