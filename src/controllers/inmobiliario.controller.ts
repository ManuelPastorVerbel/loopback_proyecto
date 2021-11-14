import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Inmobiliario} from '../models';
import {InmobiliarioRepository} from '../repositories';

export class InmobiliarioController {
  constructor(
    @repository(InmobiliarioRepository)
    public inmobiliarioRepository : InmobiliarioRepository,
  ) {}

  @post('/inmobiliarios')
  @response(200, {
    description: 'Inmobiliario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Inmobiliario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmobiliario, {
            title: 'NewInmobiliario',
            exclude: ['id'],
          }),
        },
      },
    })
    inmobiliario: Omit<Inmobiliario, 'id'>,
  ): Promise<Inmobiliario> {
    return this.inmobiliarioRepository.create(inmobiliario);
  }

  @get('/inmobiliarios/count')
  @response(200, {
    description: 'Inmobiliario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Inmobiliario) where?: Where<Inmobiliario>,
  ): Promise<Count> {
    return this.inmobiliarioRepository.count(where);
  }

  @get('/inmobiliarios')
  @response(200, {
    description: 'Array of Inmobiliario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Inmobiliario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Inmobiliario) filter?: Filter<Inmobiliario>,
  ): Promise<Inmobiliario[]> {
    return this.inmobiliarioRepository.find(filter);
  }

  @patch('/inmobiliarios')
  @response(200, {
    description: 'Inmobiliario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmobiliario, {partial: true}),
        },
      },
    })
    inmobiliario: Inmobiliario,
    @param.where(Inmobiliario) where?: Where<Inmobiliario>,
  ): Promise<Count> {
    return this.inmobiliarioRepository.updateAll(inmobiliario, where);
  }

  @get('/inmobiliarios/{id}')
  @response(200, {
    description: 'Inmobiliario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inmobiliario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Inmobiliario, {exclude: 'where'}) filter?: FilterExcludingWhere<Inmobiliario>
  ): Promise<Inmobiliario> {
    return this.inmobiliarioRepository.findById(id, filter);
  }

  @patch('/inmobiliarios/{id}')
  @response(204, {
    description: 'Inmobiliario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmobiliario, {partial: true}),
        },
      },
    })
    inmobiliario: Inmobiliario,
  ): Promise<void> {
    await this.inmobiliarioRepository.updateById(id, inmobiliario);
  }

  @put('/inmobiliarios/{id}')
  @response(204, {
    description: 'Inmobiliario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inmobiliario: Inmobiliario,
  ): Promise<void> {
    await this.inmobiliarioRepository.replaceById(id, inmobiliario);
  }

  @del('/inmobiliarios/{id}')
  @response(204, {
    description: 'Inmobiliario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inmobiliarioRepository.deleteById(id);
  }
}
