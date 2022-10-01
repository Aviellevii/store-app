import { Injectable } from '@angular/core';
import { sample_foods,sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return sample_foods;
  }
  getFoodBySearchTerm(searchTerm:string){
    return this.getAll().filter(food => food.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }
  getTag(){
    return sample_tags;
  }
  getTagBySearchTerm(searchTerm:string):Food[]{
    return searchTerm === "All"? this.getAll(): this.getAll().filter(food => food.tags?.includes(searchTerm));
  }
  getFoodById(foodId:string):Food{
    return this.getAll().find(food => food.id === foodId) ?? new Food();
  }
}
