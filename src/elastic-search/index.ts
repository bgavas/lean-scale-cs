import elasticsearch from 'elasticsearch';
import _ from 'lodash';
import { Service } from 'typedi';
import { Product } from '../modules/products/interfaces/product.interface';
import { ES_URL } from '../utils/config';
import { Indices } from '../utils/enums';
import { productMapping } from './mappings';

@Service()
export class ElasticSearch {
  private client: elasticsearch.Client;

  constructor() {
    this.client = new elasticsearch.Client({
      host: ES_URL,
      // log: 'trace',
    });
  }

  async ping() {
    return this.client.ping({});
  }

  async createIndex() {
    try {
      // Check if index already exists
      await this.client.indices.get({ index: Indices.Product });
    } catch (error) {
      // Create index if not exists
      await this.client.indices.create({
        index: Indices.Product,
        body: {
          mappings: {
            properties: productMapping,
          },
        },
      });
    }
  }

  async searchProducts(size: number, from: number, q?: string): Promise<Product[]> {
    const body: any = {
      size,
      from,
      query: {
        match_all: {},
      },
    };
    if (q) {
      body.query = {
        bool: {
          should: [{
            match: { name: q },
          }, {
            match: { description: q },
          }],
          minimum_should_match: 1,
        },
      };
    } else {
      body.query = { match_all: {} };
    }

    const result = await this.client.search({
      body,
      index: Indices.Product,
    });
    return result.hits.hits.map(h => h._source as Product);
  }

  async bulkAdd(index: Indices, data: any[]) {
    const body = _.flatMap(data, p => ([
      {
        index: {
          _index: index,
          _id: p.id,
        },
      },
      p,
    ]));

    return this.client.bulk({ body });
  }

  async bulkDelete(index: Indices) {
    return this.client.deleteByQuery({
      index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
  }

  async updateData(index: Indices, data: any[]) {
    await this.bulkDelete(index);
    await this.bulkAdd(index, data);
  }
}
