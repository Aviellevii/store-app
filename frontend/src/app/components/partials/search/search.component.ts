import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  SearchTerm:string = '';
  constructor(activatedRoute:ActivatedRoute,private router:Router) {
    activatedRoute.params.subscribe(param=>{
      if(param.searchTerm) this.SearchTerm = param.searchTerm
    })
   }

  ngOnInit(): void {
  }

  Search(Term:string){
    if(Term){
      this.router.navigateByUrl('/search/' + Term);
    }
    else this.router.navigateByUrl('/')
  }

}
