import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerResponse } from './interfaces/create-customer-response.interface';

@JsonController('/customers')
@Service()
export class CustomerController {
  constructor(
    private customerService: CustomerService,
  ) {}

  @Post('/')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponse> {
    const result = await this.customerService.createCustomer(createCustomerDto);
    return {
      success: true,
      id: result.id,
    };
  }
}
