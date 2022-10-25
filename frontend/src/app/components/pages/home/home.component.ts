import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];
  constructor(private foodservice:FoodService, activatedRoute:ActivatedRoute) { 
    let foodObservable:Observable<Food[]>;
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm)
      foodObservable = foodservice.getFoodBySearchTerm(params.searchTerm);
      else if(params.tag){
        foodObservable = foodservice.getTagBySearchTerm(params.tag);
      }
      else  foodObservable = foodservice.getAll();

      foodObservable.subscribe((serverFood)=>{
        this.foods = serverFood;
      })
    })
  }

  ngOnInit(): void {
  }

}
