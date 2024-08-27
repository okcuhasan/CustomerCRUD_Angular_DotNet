import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  @Input() customer? : Customer;
  @Output() customerUpdated = new EventEmitter<Customer[]>;

  constructor(private customerService : CustomerService) 
  {

  }

  ngOnInit() {

  }

  createCustomer(customer : Customer) {
    this.customerService.createCustomer(customer).subscribe((result : Customer[]) => this.customerUpdated.emit(result));
  }

  updateCustomer(customer : Customer) {
    this.customerService.updateCustomer(customer).subscribe((result : Customer[]) => this.customerUpdated.emit(result));
  }

  removeCustomer(customer : Customer) {
    this.customerService.removeCustomer(customer).subscribe((result : Customer[]) => this.customerUpdated.emit(result));
  }
}
