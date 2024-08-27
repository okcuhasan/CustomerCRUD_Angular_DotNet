import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = "Customer";
  customer?: Customer;

  constructor(private httpClient : HttpClient) 
  {

  }
  
  public getCustomers() : Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${environment.apiUrl}/${this.url}`)
  }

  public getCustomer(customer : Customer) : Observable<Customer> {
    return this.httpClient.get<Customer>(`${environment.apiUrl}/${this.url}/${customer.id}`)
  }

  public createCustomer(customer : Customer) : Observable<Customer[]> {
    return this.httpClient.post<Customer[]>(`${environment.apiUrl}/${this.url}/CustomerCreate`, customer)
  }

  public updateCustomer(customer : Customer) : Observable<Customer[]> {
    return this.httpClient.put<Customer[]>(`${environment.apiUrl}/${this.url}/CustomerUpdate`, customer)
  }

  public removeCustomer(customer : Customer) : Observable<Customer[]> {
    return this.httpClient.delete<Customer[]>(`${environment.apiUrl}/${this.url}/${customer.id}`)
  }
}
