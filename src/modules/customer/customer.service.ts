import { Service } from 'typedi';
import { Magento } from '../../magento';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './interfaces/customer.interface';

@Service()
export class CustomerService {
  constructor(
    private magento: Magento,
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.magento.createCustomer(createCustomerDto);
  }
}
