import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags:Tag[] = []
  constructor(private foodService:FoodService) { 
    foodService.getTag().subscribe((tagServer)=>{
      this.tags = tagServer;
    })
  }

  ngOnInit(): void {
  }

}
