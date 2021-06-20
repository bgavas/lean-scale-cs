import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import expressHttpContext from 'express-http-context';
import { SUPPORTED_LANGUAGES } from '../utils/constants';

@Middleware({ type: 'before' })
@Service()
export class LanguageMiddleware implements ExpressMiddlewareInterface {
  use(req: any, _: any, next: (err?: any) => any): void {
    const acceptLanguage = req.headers['accept-language'];

    // Determine language
    let lang = 'en';
    if (SUPPORTED_LANGUAGES.includes(acceptLanguage)) {
      lang = acceptLanguage;
    }

    // Set global langauge
    expressHttpContext.set('lang', lang);
    next();
  }
}
