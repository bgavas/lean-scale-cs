import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { LanguageFile } from '../utils/enums';
import { translate } from '../utils/helper';

@Middleware({ type: 'after' })
@Service()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: any, res: any, next: (err: any) => any) {
    res.status(400);

    // Validation error
    if (error && error.errors) {
      const errors = {};
      error.errors.forEach((e: any) => {
        errors[e.property] = translate(
          Object.values(e.constraints)[0] as string,
          LanguageFile.Error,
          req.lang,
        );
      });

      return res.json({
        errors,
        success: false,
      });
    }

    // Backend error
    return res.json({
      errors: {
        backend: translate(
          error.message || '',
          LanguageFile.Error,
          req.lang,
        ),
      },
      success: false,
    });
  }
}
