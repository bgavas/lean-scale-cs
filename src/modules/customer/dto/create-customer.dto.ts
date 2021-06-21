import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsPasswordValid } from '../../../utils/validators';

export class CreateCustomerDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'First name cannot be empty' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  lastname: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  @IsPasswordValid({ message: 'Password needs to have 1 char, 1 number and 1 symbol at least' })
  password: string;
}
