import { Component, OnInit } from '@angular/core';
import { Sauce } from '../models/Sauce.model';
import { SaucesService } from '../services/sauces.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-sauce',
  templateUrl: './single-sauce.component.html',
  styleUrls: ['./single-sauce.component.scss']
})
export class SingleSauceComponent implements OnInit {

  loading: boolean;
  sauce: Sauce;
  userId: string;
  likePending: boolean;
  liked: boolean;
  disliked: boolean;
  errorMessage: string;

  constructor(private sauces: SaucesService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.sauces.getSauceById(params.id).then(
          (sauce: Sauce) => {
            this.sauce = sauce;
            this.loading = false;
            if (sauce.usersLiked.find(user => user === this.userId)) {
              this.liked = true;
            } else if (sauce.usersDisliked.find(user => user === this.userId)) {
              this.disliked = true;
            }
          }
        );
      }
    );
    this.userId = this.auth.getUserId();
  }

  onLike() {
    if (this.disliked) {
      return 0;
    }
    this.likePending = true;
    this.sauces.likeSauce(this.sauce._id, !this.liked).then(
      (liked: boolean) => {
        this.likePending = false;
        this.liked = liked;
        if (liked) {
          this.sauce.likes++;
        } else {
          this.sauce.likes--;
        }
      }
    );
  }

  onDislike() {
    if (this.liked) {
      return 0;
    }
    this.likePending = true;
    this.sauces.dislikeSauce(this.sauce._id, !this.disliked).then(
      (disliked: boolean) => {
        this.likePending = false;
        this.disliked = disliked;
        if (disliked) {
          this.sauce.dislikes++;
        } else {
          this.sauce.dislikes--;
        }
      }
    );
  }

  onBack() {
    this.router.navigate(['/sauces']);
  }

  onModify() {
    this.router.navigate(['/modify-sauce', this.sauce._id]);
  }

  onDelete() {
    this.loading = true;
    this.sauces.deleteSauce(this.sauce._id).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.loading = false;
        this.router.navigate(['/sauces']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error(error);
      }
    );
  }
}
