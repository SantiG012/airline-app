import { Component } from '@angular/core';
import { InvoiceGetService } from 'src/app/modules/data-bases-services/gets/invoice-get.service';
import { Invoice } from 'src/app/interfaces/invoice';
import { ActivatedRoute } from '@angular/router';
import { Observable,tap} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  bookingId: string = '';
  invoice$!: Observable<Invoice>;

  constructor(private invoiceGetService: InvoiceGetService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    this.bookingId = this.route.snapshot.queryParamMap.get('booking')!;
    this.invoice$ = this.invoiceGetService.getInvoiceByBookingId(this.bookingId).pipe(
       //Logs the fact that the invoice has been fetched
        tap(invoice => console.log('Factura',invoice.facturaId))
    )
  }

}
