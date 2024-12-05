import { Component, Input } from '@angular/core';
import { Booking, BookingStatus } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-resume',
  standalone: true,
  imports: [],
  templateUrl: './booking-resume.component.html',
  styleUrl: './booking-resume.component.css'
})
export class BookingResumeComponent {
  @Input()
  bookingInput: Booking = new Booking(1, "Juan Pérez", "+34 600 123 456", "juan.perez@example.com", 4, "Prefiere mesa cerca de la ventana.", new
    Date("2024-12-15T20:00:00"), new Date("2024-12-01T10:30:00"), BookingStatus.PENDING)


    constructor(private routerService: Router,private bookingService: BookingService){}

    deleteBooking(id:number){
      this.bookingService.deleteBooking(id);
    }

    editBooking(bookingId: number) {
      this.routerService.navigate([`edit/${bookingId}`])
    }
}
