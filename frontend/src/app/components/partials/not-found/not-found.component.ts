import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  @Input() visiable = false;
  @Input() notFoundMessage = "Nothing Found!";
  @Input() resetLinkText ="Reset";
  @Input() resetLinkRoute ="/";
  constructor() { }

  ngOnInit(): void {
  }

}
