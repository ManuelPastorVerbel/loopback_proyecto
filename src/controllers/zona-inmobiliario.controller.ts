import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Zona,
  Inmobiliario,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaInmobiliarioController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/inmobiliarios', {
    responses: {
      '200': {
        description: 'Array of Zona has many Inmobiliario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmobiliario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmobiliario>,
  ): Promise<Inmobiliario[]> {
    return this.zonaRepository.inmobiliarios(id).find(filter);
  }

  @post('/zonas/{id}/inmobiliarios', {
    responses: {
      '200': {
        description: 'Zona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmobiliario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Zona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmobiliario, {
            title: 'NewInmobiliarioInZona',
            exclude: ['id'],
            optional: ['zonaId']
          }),
        },
      },
    }) inmobiliario: Omit<Inmobiliario, 'id'>,
  ): Promise<Inmobiliario> {
    return this.zonaRepository.inmobiliarios(id).create(inmobiliario);
  }

  @patch('/zonas/{id}/inmobiliarios', {
    responses: {
      '200': {
        description: 'Zona.Inmobiliario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmobiliario, {partial: true}),
        },
      },
    })
    inmobiliario: Partial<Inmobiliario>,
    @param.query.object('where', getWhereSchemaFor(Inmobiliario)) where?: Where<Inmobiliario>,
  ): Promise<Count> {
    return this.zonaRepository.inmobiliarios(id).patch(inmobiliario, where);
  }

  @del('/zonas/{id}/inmobiliarios', {
    responses: {
      '200': {
        description: 'Zona.Inmobiliario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmobiliario)) where?: Where<Inmobiliario>,
  ): Promise<Count> {
    return this.zonaRepository.inmobiliarios(id).delete(where);
  }
}
