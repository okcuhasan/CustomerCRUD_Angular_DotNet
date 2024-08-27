import { Component } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Customer } from './models/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NgCustomer.Ui';
  customers?: Customer[];
  customerToEdit?: Customer;

  constructor(private customerService : CustomerService) 
  {

  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((result : Customer[]) => this.customers = result);
  }

  initNewCustomer() {
    this.customerToEdit = new Customer();
  }

  updateCustomerList(customer : Customer[]) {
    this.customers = customer;
  }

  updateCustomer(customer : Customer) {
    this.customerToEdit = customer;
  }
}
