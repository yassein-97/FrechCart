import { Component } from '@angular/core';
import { categoryItem } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  isloading:boolean=true;
  categoryList:categoryItem[] = [];
  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {

    this._ProductsService.getAllCategories().subscribe({
      next: (response) =>{
        console.log(response);
        this.categoryList = response.data;
        this.isloading= false;
      },
      error: (error)=>{
        console.log(error);
        this.isloading= false;
      }
    });
  }
}
