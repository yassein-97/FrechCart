import { Component } from '@angular/core';
import { Brand, Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {

  activepage1:boolean = true;
  isloading:boolean=true;
  branList:Brand[]= [];
  page1:Brand[]=[];
  page2:Brand[]=[];
constructor(private _ProductsService:ProductsService){}

ngOnInit(): void {
  this.showAllBrands();
}

showAllBrands(){
  this._ProductsService.getAllBrands().subscribe({
    next: (response) =>{
      console.log(response.data);
      this.isloading=false;
        this.page1 = response.data;
        this.page2 = this.page1.splice(0,20);
        this.branList =  this.page1;
    },
    error:(error)=>{
      console.log(error);
      this.isloading=false;
    }
  });
}

getNextpage(){
  this.activepage1 = false;
  window.scrollTo(0, 0);
  this.branList = this.page2;
}
getPrevpage(){
  this.activepage1 = true;
  window.scrollTo(0, 0);
  this.branList = this.page1;
}
}
