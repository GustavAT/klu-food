import Category from './category';
import Restaurant from './restaurant';
import Weekday from './weekday';

export default interface Dish {
  name: string;
  sideDish: string;
  allergens: string[];
  price: string;
  vegetarian: boolean;
  category: Category;
  restaurant: Restaurant;
  weekday: Weekday;
}
