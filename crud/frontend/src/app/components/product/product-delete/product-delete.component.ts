import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  product!: Product


  constructor(private productService: ProductService,
     private router: Router,
     private route: ActivatedRoute){}

     ngOnInit(): void {
      var strId = this.route.snapshot.paramMap.get('id')
      var id = parseInt(strId)
      this.productService.readById(id).subscribe(product => {
        this.product = product
      })
    }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.ShowMessage('Produto Deletado!!!')
      this.router.navigate(['/products'])
    })
  }


  cancel(): void {
    this.router.navigate(['/products'])
  }
}
