import { Component } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // numOFCartItems:number = 0;
  // numOFWishListItems:number = 0;
  isloading:boolean=false;
  errUrl:string=''
  loginForm:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{6,20}$/)])
  });
  constructor(
    private _AuthenticationService:AuthenticationService,
    private _Router:Router,
    // private _CartService:CartService,
    // private _WishlistService:WishlistService
    ){};
  ngOnInit(): void {
    if(localStorage.getItem('userToken'))
    localStorage.removeItem('userToken');
  }
  submitLogin(){
    this.isloading=true;
    if(this.loginForm.valid){
        this._AuthenticationService.login(this.loginForm.value).subscribe({
          next: (response) =>{
            console.log(response);
            if(response.message === 'success'){
              localStorage.setItem('userToken',response.token);
              // localStorage.setItem('userId',response.);
              this._AuthenticationService.decodeUserToken();
              this._Router.navigate(['/home']);
              this.isloading=false;
              // this._CartService.numOfCartItems.subscribe(
              //   (data)=>{
              //   this.numOFCartItems = data 
              //   console.log(data);
              // }
              //   );
          
              //   this._WishlistService.numOfWishListItem.subscribe(
              //     (data)=>{
              //     this.numOFWishListItems = data 
              //     console.log(data);
              //   }
              //     );
            }
          },
          error: (err)=>{
            this.errUrl = err.error.message;
            this.isloading=false;
          }
        });
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  };
};
