import { Component, OnInit } from '@angular/core';
import { SaucesService } from '../services/sauces.service';
import { Subscription } from 'rxjs';
import { Sauce } from '../models/Sauce.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sauce-list',
  templateUrl: './sauce-list.component.html',
  styleUrls: ['./sauce-list.component.scss']
})
export class SauceListComponent implements OnInit {

  sauceSub: Subscription;
  sauces: Sauce[];
  loading: boolean;
  errorMsg: string;

  constructor(private sauce: SaucesService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.sauceSub = this.sauce.sauces$.subscribe(
      (sauces) => {
        this.sauces = sauces;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.sauce.getSauces();
  }

  onClickSauce(id: string) {
    this.router.navigate(['sauce', id]);
  }

}
