import { Component, Renderer2 } from '@angular/core';
import { Product} from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // numberOfCartItem:number = 0;
  myWishList:string[]=[];
  // addtoWish:boolean = false;
  flag:boolean = true;
  term:string= '';
  activepage1:boolean = true;
  isloading:boolean=true;
  productList:Product[]= [];
  productId:string[]=[] ;
  page1:Product[]=[];
  page2:Product[]=[];
  constructor(
    private _ProductsService:ProductsService , 
    private _CartService:CartService,
    private toastr: ToastrService,
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2
    ){}

  ngOnInit(): void {
    
    this.displayAllProducts();
    this.getUserWishList();
    this.getUserCart();
  }

  displayAllProducts(){
    this._ProductsService.getAllProducts().subscribe({
      next:(response)=>{
        this.isloading=false;
        // if(response.data.length ){}
        this.page1 = response.data;
        // console.log(this.page1);
        // console.log(response.data[0]._id);
        
        // for(let i=0; i<response.data.length;i++){
        //   // this.productId.push(response.data[i]._id);
        //   this.productId.push(response.data[i]._id);
        // }
        // console.log(this.productId);
        
        this.page2 = this.page1.splice(0,20);
        this.productList =  this.page1;
      },
      error:(err)=>{
        this.isloading=false;
        console.log(err);
      }
    });
  };

  getNextpage(){
    this.activepage1 = false;
    window.scrollTo(0, 600);
    this.productList = this.page2;
  }
  getPrevpage(){
    this.activepage1 = true;
    window.scrollTo(0, 600);
    this.productList = this.page1;
  }

  searchMode(){
    if(this.term.length>0){
      this.flag=false;
      this.productList = [...this.page2 , ...this.page1];
      console.log(this.productList);
    }
    else{
      this.flag=true;
      this.productList = this.page1;
    }
  }

  addItemToCart(prductId:string){
    this._CartService.addProductToCart(prductId).subscribe({
      next: response =>{
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        console.log(response);
        this.toastr.success('', 'Product added successfully to your cart',{
          timeOut: 3000,
          positionClass:'toast-bottom-right',
          progressBar: true,
          closeButton:true,
        });
      },
      error: err =>{
        console.log(err);
      }
    });
  }


  // addProductToWishList(){
  //   if(this.addtoWish ==false){
  //     this.addtoWish = true;
  //   }
  //   else{
  //     this.addtoWish = false;
  //   }
  // }

  addProductToWishList(productId:string){
    this._WishlistService.addProductToWishList(productId).subscribe({
      next: response=>{
        console.log(response);
        this.myWishList = response.data;
        this._WishlistService.numOfWishListItem.next(response.data.length);
        this.toastr.success('', 'Product added successfully to your wish list',{
          timeOut: 3000,
          positionClass:'toast-bottom-right',
          progressBar: true,
          closeButton:true,
        });
        // this._Renderer2.setAttribute(element,'class','fa fa-heart heart-color fs-4 fa-beat');
      },
      error: err =>{
        console.log(err);
        
      }
    });
  }
  removeProductFromWishList(prductId:string){
    this._WishlistService.removeProductFromWishlist(prductId).subscribe({
      next: response =>{
        console.log(response);
        this.myWishList = response.data;
        // console.log(this.myWishList);
        
        this._WishlistService.numOfWishListItem.next(response.data.length);
        this.toastr.success('', 'Product removed successfully from your cart',{
          timeOut: 3000,
          positionClass:'toast-bottom-right',
          progressBar: true,
          closeButton:true,
        });
      },
      error: err=>{
        console.log(err);
        
      }
    });
  }


  getUserWishList(){
    this._WishlistService.getLoggedUserWishList().subscribe({
      next:response =>{
        console.log(response.count);
        this._WishlistService.numOfWishListItem.next(response.count);
        for(let i=0; i<response.data.length;i++){
          // this.productId.push(response.data[i]._id);
          this.myWishList.push(response.data[i]._id);
        }
      },
      error: err =>{
        console.log(err);
      }
    });
  }

  getUserCart(){
    this._CartService.getLoggedUserCart().subscribe({
      next:response =>{
        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: err =>{
        console.log(err);
      }
    });
  }
}
