import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sauce } from '../models/Sauce.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SaucesService {

  sauces$ = new Subject<Sauce[]>();

  tempSauces = [
    {
      _id: 'eizomfhazo',
      name: 'The Last Dab',
      manufacturer: 'Heatonist',
      description: 'CAUTION! The Last Dab—the hottest sauce on Hot Ones, known for turning guests and fans alike into stuttering, fire-breathing lunatics—just got even crazier. The Last Dab first took the world by storm as the only sauce made with Smokin\' Ed Currie\'s infamous "Pepper X." This XX-rated edition gets its one-two punch of heat from addition of the equally lethal "Chocolate Pepper X." All you need is a dab to light the inferno and experience the Hot Ones tradition.',
      heat: 10,
      likes: 100,
      dislikes: 0,
      imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/LAstdabReduxx_1024x1024-1_1024x1024.jpg?v=1527778720',
      mainPepper: 'Pepper X',
      usersLiked: [],
      usersDisliked: []
    },
    {
      _id: 'oimhoiohmhoih',
      name: 'Los Calientes',
      manufacturer: 'Heatonist',
      description: 'Hot Ones is the show where celebrities divulge their deepest secrets while eating progressively hotter wings. The middle of the lineup is where hot sauce magic happens—the perfect sweet spot between maximum flavor and pleasing heat. Inspired by our favorite Cali-Mex flavors, Los Calientes surfs over the palate with a punchy, smoky blend...',
      heat: 5,
      likes: 100,
      dislikes: 0,
      imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/LOS_CALIENTES1_1024x1024.jpg?v=1527709467',
      mainPepper: 'Serrano',
      usersLiked: [],
      usersDisliked: []
    },
    {
      _id: 'oimjoijlhui',
      name: 'Black Garlic',
      manufacturer: 'Bravado Spice Company',
      description: 'Team Bravado is back at it with an elevated offering where Carolina Reaper meets aged black garlic. The sweetness of the slowly cooked garlic tempers the initial bitter burn of the Reaper, but not for long... This is a biting hot sauce you\'ll want in marinades, sauces, dressings, and on those garlic wings! ',
      heat: 6,
      likes: 100,
      dislikes: 0,
      imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/bravado-blackgarlichotsauce_1024x1024.jpg?v=1527270029',
      mainPepper: 'Carolina Reaper',
      usersLiked: [],
      usersDisliked: []
    },
    {
      _id: 'sildjhv',
      name: 'Smoked Onion',
      manufacturer: 'Butterfly Bakery',
      description: 'The makers at Butterfly Bakery smoke Vermont onions with maplewood to mix with red jalapeños for this sweet and tangy sauce. Great on everything from bagels lox & cream cheese to hummus to pork and whatever else you can name. The medium heat level makes it the perfect smoky sauce for anyone!',
      heat: 3,
      likes: 100,
      dislikes: 0,
      imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/smokedonion1_1024x1024_copy_1024x1024.jpg?v=1538413599',
      mainPepper: 'Jalapeños',
      usersLiked: [],
      usersDisliked: []
    },
    {
      _id: 'eroimfgjlfh',
      name: 'Blair\'s Ultra Death Sauce',
      manufacturer: 'Blair\'s',
      description: 'Blair\'s Ultra Death has established itself as a bit of a legend within the hot sauce world.\n' +
        '\n' +
        'If there\'s one thing that creator Blair Lazar does well it\'s retaining the flavour in his super-hot sauces. They\'ll melt your face off for sure, but despite the extract they still taste damned fine.\n' +
        '\n' +
        'Just to emphasise the seriousness of the heat we\'re dealing with here, all Blair\'s super-hot sauces in the Death range now come in a nifty coffin box with his trademark skull keyring attached to the bottle.',
      heat: 9,
      likes: 100,
      dislikes: 0,
      imageUrl: 'https://www.chilliworld.com/content/images/thumbs/0000827_blairs-ultra-death-sauce-in-a-coffin_550.jpeg',
      mainPepper: 'Carolina Reaper',
      usersLiked: [],
      usersDisliked: []
    }
  ];

  constructor(private http: HttpClient,
              private auth: AuthService) {}

  getSauces() {
    this.http.get('http://localhost:3000/api/sauces').subscribe(
      (sauces: Sauce[]) => {
        this.sauces$.next(sauces);
      },
      (error) => {
        this.sauces$.next([]);
        console.error(error);
      }
    );
  }

  getSauceById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/sauces/' + id).subscribe(
        (sauce: Sauce) => {
          resolve(sauce);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  likeSauce(id: string, like: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/sauces/' + id + '/like',
        {
          userId: this.auth.getUserId(),
          like: like ? 1 : 0
        })
        .subscribe(
          (response: { message: string }) => {
            resolve(like);
          },
          (error) => {
            reject(error);
        }
      );
    });
  }

  dislikeSauce(id: string, dislike: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/sauces/' + id + '/like',
        {
          userId: this.auth.getUserId(),
          like: dislike ? -1 : 0
        })
        .subscribe(
          (response: { message: string }) => {
            resolve(dislike);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createSauce(sauce: Sauce, image: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('sauce', JSON.stringify(sauce));
      formData.append('image', image);
      this.http.post('http://localhost:3000/api/sauces', formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifySauce(id: string, sauce: Sauce, image: string | File) {
    return new Promise((resolve, reject) => {
      if (typeof image === 'string') {
        this.http.put('http://localhost:3000/api/sauces/' + id, sauce).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('sauce', JSON.stringify(sauce));
        formData.append('image', image);
        this.http.put('http://localhost:3000/api/sauces/' + id, formData).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  deleteSauce(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/sauces/' + id).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
