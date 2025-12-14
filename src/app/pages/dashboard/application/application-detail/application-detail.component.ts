import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-application-detail',
    templateUrl: './application-detail.component.html',
    styleUrls: ['./application-detail.component.scss'],
    standalone: false
})
export class ApplicationDetailComponent implements OnInit {
  applicationId: number = 0;
  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.applicationId = params['id'];
    });
  }

}
