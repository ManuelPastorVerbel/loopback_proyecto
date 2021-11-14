import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmobiliario, InmobiliarioRelations} from '../models';

export class InmobiliarioRepository extends DefaultCrudRepository<
  Inmobiliario,
  typeof Inmobiliario.prototype.id,
  InmobiliarioRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Inmobiliario, dataSource);
  }
}
