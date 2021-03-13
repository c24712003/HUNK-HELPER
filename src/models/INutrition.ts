export interface Nurtrition {
    id: string;
    name: string;
    ingredients: {name: string, value: string}[];
    unit: string;
    calories: number;
    dateFoodList?: string[];
}