import { Model as SequelizeModel } from 'sequelize-typescript';
import { AssociationActionOptions } from 'sequelize-typescript/dist/model/model/association/association-action-options';
import {
  AssociationI,
  Entity,
} from '#core/database/models/beans/associations/Association';

export class HasOneAssociation<
  TModel extends SequelizeModel<Entity, Entity>,
  K extends keyof TModel,
  TAssociatedModel extends SequelizeModel<Entity, Entity>,
  KAssociatedModel extends keyof TAssociatedModel,
> extends AssociationI<TModel, K, TAssociatedModel, KAssociatedModel> {
  constructor(parentThis: TModel, associationKey: K) {
    super(parentThis, associationKey);
  }

  set(instance: TAssociatedModel, options?: AssociationActionOptions) {
    return this.withSafeTransaction<unknown>(
      options.transaction,
      ({ transaction }) => {
        return this.parentThis.$set<TAssociatedModel>(
          this.associationKey,
          instance,
          { transaction, ...options },
        );
      },
    );
  }
}
