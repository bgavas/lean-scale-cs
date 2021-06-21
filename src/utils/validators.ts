import { registerDecorator, ValidationOptions } from 'class-validator';
import passwordValidator from 'password-validator';

// tslint:disable-next-line: variable-name
export const IsPasswordValid = (validationOptions?: ValidationOptions) => {
  const schema = new passwordValidator();
  schema
    .has().digits(1)
    .has().letters(1)
    .has().symbols();

  return (object: object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isPasswordValid',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const isString = typeof value === 'string';
          const isValid = !!schema.validate(value);
          return isString && isValid;
        },
      },
    });
  };
};
