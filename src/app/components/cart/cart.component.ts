import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartId:string = '';
  // productsQuantity
  productsQuantity:number[]=[];
  isloading:boolean= true;
  productPrice:number = 0;
  numberOfCartItem:number = 0;
  ProductList:any[]=[];
  constructor(private _CartService:CartService){}

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart(){
    this._CartService.getLoggedUserCart().subscribe({
      next:response =>{
        console.log(response);
        this.cartId = response.data._id;
        this.productPrice = response.data.totalCartPrice;
        this.numberOfCartItem= response.numOfCartItems;
        this.ProductList = response.data.products;
        
        // console.log(this.ProductList);
        // this.productsQuantity = response.data.products[0].product.quantity;
        for(let i=0; i<response.data.products.length;i++){
          this.productsQuantity.push(response.data.products[i].product.quantity);
        }
        console.log(this.productsQuantity);
        this.isloading = false;
      },
      error: err =>{
        console.log(err);
        this.isloading = false;
      }
    });
  }
  removeFromCart(productId:string){
    this._CartService.removeProductFromCart(productId).subscribe({
      next: response =>{
        this.productsQuantity = [];
        console.log(response);
        this.productPrice = response.data.totalCartPrice;
        this.numberOfCartItem= response.numOfCartItems;
        this.ProductList = response.data.products;
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        for(let i=0; i<response.data.products.length;i++){
          this.productsQuantity.push(response.data.products[i].product.quantity);
        }
        console.log(this.productsQuantity);
      },

      error: err =>{
        console.log(err);
        
      }
    });
  }

  removeAllProductsinCart(){
    this._CartService.clearAllCart().subscribe({
      next: response =>{
        console.log(response);
        this.productPrice = 0;
        this.numberOfCartItem= 0;
        this.ProductList = [];
        this._CartService.numOfCartItems.next(0);
      },
      error: err=>{
        console.log(err);
        
      }
    });
  }

  updateCartProductQuantity(productId:string,count:number){
    this._CartService.updateProductQuantity(productId,count).subscribe({
      next: response =>{
        console.log(response);
        this.productPrice = response.data.totalCartPrice;
        this.numberOfCartItem= response.numOfCartItems;
        this.ProductList = response.data.products;
        console.log(this.ProductList);
        
      },
      error: err =>{
        console.log(err);
        
      }
    });
  }
}
