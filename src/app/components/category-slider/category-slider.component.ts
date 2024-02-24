import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { categoryItem } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';
// import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss']
})
export class CategorySliderComponent {
  categoryList:categoryItem[]=[];
  constructor(private _ProductsService:ProductsService){}


  customOptions: OwlOptions = {
    loop: true,
    autoplay:false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this._ProductsService.getAllCategories().subscribe({
      next:(response)=>{
        this.categoryList = response.data;
        console.log(this.categoryList);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
}
