import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { BookingResumeComponent } from "../../components/booking/booking-resume/booking-resume.component";

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, BookingResumeComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit{


  bookingList:Booking[] = []

  constructor(private bookingService: BookingService){}

  ngOnInit(): void {
    this.bookingList = this.bookingService.getListBooking();
  }

}
