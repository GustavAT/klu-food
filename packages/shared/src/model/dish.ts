import Restaurant from './restaurant';
import Weekday from './weekday';

export interface Dish {
  name: string;
  sideDish: string;
  allergens: string[];
  price: number;
  vegan: boolean;
  category: string;
  restaurant: Restaurant;
  weekday: Weekday;
}
