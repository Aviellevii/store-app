import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOODS_TAGS_URL, FOODS_URL, FOODS_BY_SEARCH_URL,FOODS_BY_TAG_URL,FOOD_BY_ID_URL} from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }
  getFoodBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }
  getTag():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }
  getTagBySearchTerm(searchTerm:string):Observable<Food[]>{
    return searchTerm === "All"? this.getAll(): this.http.get<Food[]>(FOODS_BY_TAG_URL + searchTerm)
  }
  getFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId)
  }
}
