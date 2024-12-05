import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { Booking, BookingStatus } from '../../../models/booking.model';
import { customValidatorNumComensalesMayor50, customValidatorNumComensalesMenor0 } from './booking-fom.validators';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnChanges, OnInit {

  formBooking: FormGroup;

  constructor(private route: ActivatedRoute, private routerService: Router, private bookingServise: BookingService, formBuilder: FormBuilder) {
    this.formBooking = formBuilder.group({
      'id': ['', []],
      'nombre': ['', [Validators.required, Validators.maxLength(50)]],
      'telefono': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'numComensales': ['', [Validators.required,customValidatorNumComensalesMenor0(),customValidatorNumComensalesMayor50()]],
      'nota': ['', [Validators.maxLength(240)]],
      'fecha': ['', [Validators.required]],
    })
  }
  @Input()
  bookingEdit: Booking | null = null;



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.bookingEdit = this.bookingServise.getBookingById(id);


      if (this.bookingEdit) {
        this.formBooking.patchValue({
          nombre: this.bookingEdit.client,
          telefono: this.bookingEdit.phone,
          email: this.bookingEdit.email,
          numComensales: this.bookingEdit.persons,
          nota: this.bookingEdit.persons,
          fecha: this.bookingEdit.getDateForm()
        });
      }


    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookingEdit'].currentValue) {
      const booking = changes['bookingEdit'].currentValue as Booking;
      this.formBooking.patchValue({
        nombre: booking.client,
        telefono: booking.phone,
        email: booking.email,
        numComensales: booking.persons,
        nota: booking.persons,
        fecha: booking.getDateForm()
      })
    }
  }


  onSubmit() {
    if (this.formBooking.valid) {
      let bookingForm = this.formBooking.value;

      if (this.bookingEdit) {
        let booking: Booking = new Booking(
          this.bookingEdit.id,
          bookingForm.nombre,
          bookingForm.telefono,
          bookingForm.email,
          bookingForm.numComensales,
          bookingForm.nota,
          bookingForm.date,
          this.bookingEdit.dateCreation,
          bookingForm.status
        )

        this.bookingServise.addBooking(booking)
      } else {
        let booking: Booking = new Booking(
          0,
          bookingForm.nombre,
          bookingForm.telefono,
          bookingForm.email,
          bookingForm.numComensales,
          bookingForm.nota,
          new Date(bookingForm.fecha),
          new Date(Date.now()),
          BookingStatus.PENDING
        )

        this.bookingServise.addBooking(booking)
      }


      this.routerService.navigate(['/bookings'])
    }


  }
}
