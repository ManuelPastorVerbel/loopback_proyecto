import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inmobiliario} from './inmobiliario.model';

@model()
export class Zona extends Entity {
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
  ubicacion: string;

  @hasMany(() => Inmobiliario)
  inmobiliarios: Inmobiliario[];

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
