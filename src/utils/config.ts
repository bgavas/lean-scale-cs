export const ENVIRONMENT = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const DISABLE_CLUSTER = process.env.DISABLE_CLUSTER === 'true';
export const MAGENTO = {
  CONSUMER_KEY: process.env.MAGENTO_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.MAGENTO_CONSUMER_SECRET,
  ACCESS_TOKEN: process.env.MAGENTO_ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET: process.env.MAGENTO_ACCESS_TOKEN_SECRET,
};
