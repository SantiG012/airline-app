import { Component } from '@angular/core';
import { InvoiceGetService } from 'src/app/modules/data-bases-services/gets/invoice-get.service';
import { BookingPutService } from 'src/app/modules/data-bases-services/puts/booking-put.service';
import { Invoice } from 'src/app/interfaces/invoice';
import { ActivatedRoute,Router} from '@angular/router';
import { NEVER, Observable,catchError,of,tap} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  bookingId: string = '';
  invoice$!: Observable<Invoice>;
  invoicePrice!:string;
  redirect: boolean = false;

  constructor(private invoiceGetService: InvoiceGetService,
              private route: ActivatedRoute,
              private router: Router,
              private bookingPutService:BookingPutService) {}

  ngOnInit(){
    this.bookingId = this.route.snapshot.queryParamMap.get('booking')!;
    this.invoice$ = this.invoiceGetService.getInvoiceByBookingId(this.bookingId).pipe(
       //Logs the fact that the invoice has been fetched
        tap(invoice => {
          this.invoicePrice = invoice.precio;
        }),
        //Handles the error
        catchError((error:HttpErrorResponse)=>{
          const defaultInvoice:Invoice = this.createDefaultInvoice();
          this.invoicePrice = defaultInvoice.precio;
          return this.handleException<Invoice>(error,'fetch invoice',defaultInvoice);
        })
    )
  }

  private createDefaultInvoice():Invoice{
    return {
      facturaId: '',
      usuarioId: '',
      estado: '',
      reserva: '',
      precio: 'No diponible'
    }
  }

  private handleException<T>(error: HttpErrorResponse, operation:string,result?:T):Observable<T> {
    if (error.status === 0){
      alert('Error de conexión con el servidor');
      return of(result as T);
    }

    alert('Error a la hora de ' + operation + ': '+error.error.mensaje);
    return of(result as T);
  }

  onClick(){

    this.bookingPutService.payBooking(this.bookingId).subscribe(
      () => {
        this.redirect = true;

        setTimeout(() => {
          this.router.navigate(['']);
        }
        , 5000);
      }
    );
  }

}
