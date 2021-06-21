import dotenv from 'dotenv';
dotenv.config();
import { ElasticSearch } from '../elastic-search';
import { Magento } from '../magento';
import { Product } from '../modules/products/interfaces/product.interface';
import { Indices } from '../utils/enums';

const es = new ElasticSearch();
const magento = new Magento();

const run = async () => {
  await es.createIndex();

  const categories = await magento.getCategories();
  const categoryProducts = await magento.getCategoryProducts(categories.id);
  const skus = categoryProducts.map(cp => cp.sku);

  const magentoProducts = await magento.searchProducts(skus);
  const products: Product[] = magentoProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    sku: p.sku,
    description: p.type_id,
    image: p.type_id,
  }));

  await es.updateData(Indices.Product, products);
};

run();
