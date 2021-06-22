import dotenv from 'dotenv';
dotenv.config();
import csvParse from 'csv-parse';
import fs from 'fs';
import { CreateCustomerDto } from '../modules/customer/dto/create-customer.dto';
import { validateSync } from 'class-validator';
import { CustomerService } from '../modules/customer/customer.service';
import { Magento } from '../magento';
import { logger } from '../utils/logger';

const run = async () => {
  const parser = csvParse({ columns: true });
  const magento = new Magento();
  const customerService = new CustomerService(magento);
  const customers: CreateCustomerDto[] = [];

  parser.on('readable', () => {
    let record: any;

    // tslint:disable-next-line: no-conditional-assignment
    while (record = parser.read()) {
      const customer = new CreateCustomerDto();
      customer.email = record.email;
      customer.firstname = record.firstname;
      customer.lastname = record.lastname;
      customer.password = record.password;

      const errors = validateSync(customer);
      if (errors.length) {
        throw new Error('At least 1 customer does not fit the criteria');
      }

      customers.push(customer);
    }
  });

  parser.on('end', async () => {
    const promises: any[] = [];

    customers.forEach((c) => {
      promises.push(
        customerService.createCustomer(c)
          .catch((e) => {
            logger.error(`Failed while creating customer: ${e}`);
          }),
      );
    });

    // I would run those parallel operations in batches with the size of 50-100 normally.
    // Because I don't want to invest much time on that logic, I run them all parallel.
    await Promise.all(promises);
    logger.info('Customer import done');
  });

  fs.createReadStream(`${__dirname}/../assets/customers.csv`).pipe(parser);
};

run();
