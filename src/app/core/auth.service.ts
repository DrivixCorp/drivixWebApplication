/*import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: AngularFireAuthModule = null;

  constructor(private af: AngularFireModule,
              private db: AngularFireStorageModule,
              private router:Router) {

            af.auth.subscribe((auth) => {
              this.authState = auth;
            });
          }
}*/