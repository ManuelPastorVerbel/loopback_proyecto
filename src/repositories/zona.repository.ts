import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Zona, ZonaRelations, Inmobiliario} from '../models';
import {InmobiliarioRepository} from './inmobiliario.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {

  public readonly inmobiliarios: HasManyRepositoryFactory<Inmobiliario, typeof Zona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmobiliarioRepository') protected inmobiliarioRepositoryGetter: Getter<InmobiliarioRepository>,
  ) {
    super(Zona, dataSource);
    this.inmobiliarios = this.createHasManyRepositoryFactoryFor('inmobiliarios', inmobiliarioRepositoryGetter,);
    this.registerInclusionResolver('inmobiliarios', this.inmobiliarios.inclusionResolver);
  }
}
