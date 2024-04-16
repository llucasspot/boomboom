import { Model as SequelizeModel } from 'sequelize-typescript';
import { HasOneAssociation } from 'src/core/database/models/beans/associations/HasOneAssociation';
import { Entity } from '#core/database/models/beans/associations/Association';

export class BelongToAssociation<
  TModel extends SequelizeModel<Entity, Entity>,
  K extends keyof TModel,
  TAssociatedModel extends SequelizeModel<Entity, Entity>,
  KAssociatedModel extends keyof TAssociatedModel,
> extends HasOneAssociation<TModel, K, TAssociatedModel, KAssociatedModel> {
  constructor(parentThis: TModel, associationKey: K) {
    super(parentThis, associationKey);
  }
}
