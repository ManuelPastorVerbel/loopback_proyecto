import {Entity, model, property} from '@loopback/repository';

@model()
export class Inmobiliario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  oferta: string;

  @property({
    type: 'number',
    required: true,
  })
  habitaciones: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
  })
  zonaId?: string;

  constructor(data?: Partial<Inmobiliario>) {
    super(data);
  }
}

export interface InmobiliarioRelations {
  // describe navigational properties here
}

export type InmobiliarioWithRelations = Inmobiliario & InmobiliarioRelations;
