export const ENVIRONMENT = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const DISABLE_CLUSTER = process.env.DISABLE_CLUSTER === 'true';
export const ES_URL = process.env.ES_URL;
export const MAGENTO = {
  ACCESS_TOKEN: process.env.MAGENTO_ACCESS_TOKEN,
  URL: process.env.MAGENTO_URL,
};
