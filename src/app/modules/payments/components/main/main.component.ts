import { Component } from '@angular/core';
import { InvoiceGetService } from 'src/app/modules/data-bases-services/gets/invoice-get.service';
import { BookingPutService } from 'src/app/modules/data-bases-services/puts/booking-put.service';
import { Invoice } from 'src/app/interfaces/invoice';
import { ActivatedRoute,Router} from '@angular/router';
import { Observable,tap} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  bookingId: string = '';
  invoice$!: Observable<Invoice>;
  redirect: boolean = false;

  constructor(private invoiceGetService: InvoiceGetService,
              private route: ActivatedRoute,
              private router: Router,
              private bookingPutService:BookingPutService) {}

  ngOnInit(){
    this.bookingId = this.route.snapshot.queryParamMap.get('booking')!;
    this.invoice$ = this.invoiceGetService.getInvoiceByBookingId(this.bookingId).pipe(
       //Logs the fact that the invoice has been fetched
        tap(invoice => console.log('Factura',invoice.facturaId))
    )
  }

  onClick(){
    
    this.bookingPutService.payBooking(this.bookingId).subscribe(
      () => {
        this.redirect = true;

        setTimeout(() => {
          this.router.navigate(['']);
        }
        , 4000);
      }
    );
  }

}
