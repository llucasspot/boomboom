import { Model as SequelizeModel } from 'sequelize-typescript';
import { AssociationCreateOptions } from 'sequelize-typescript/dist/model/model/association/association-create-options';
import { AssociationCountOptions } from 'sequelize-typescript/dist/model/model/association/association-count-options';
import { AssociationActionOptions } from 'sequelize-typescript/dist/model/model/association/association-action-options';
import { Attributes } from 'sequelize/types/model';
import {
  AssociationI,
  Entity,
} from '#core/database/models/beans/associations/Association';

export class HasManyAssociation<
  TModel extends SequelizeModel<Entity, Entity>,
  K extends keyof TModel,
  TAssociatedModel extends SequelizeModel<Entity, Entity>,
  KAssociatedModel extends keyof TAssociatedModel,
  TCreateInstanceBody = Omit<
    Attributes<TAssociatedModel>,
    keyof Entity | KAssociatedModel
  >,
> extends AssociationI<TModel, K, TAssociatedModel, KAssociatedModel> {
  constructor(parentThis: TModel, associationKey: K) {
    super(parentThis, associationKey);
  }

  set(instances: TAssociatedModel[], options?: AssociationActionOptions) {
    return this.withSafeTransaction<unknown>(
      options.transaction,
      ({ transaction }) => {
        return this.parentThis.$set<TAssociatedModel>(
          this.associationKey,
          instances,
          { transaction, ...options },
        );
      },
    );
  }

  addMany(instances: TAssociatedModel[], options?: AssociationActionOptions) {
    return this.withSafeTransaction<unknown>(
      options.transaction,
      ({ transaction }) => {
        return this.parentThis.$add<TAssociatedModel>(
          this.associationKey as string,
          instances,
          { transaction, ...options },
        );
      },
    );
  }

  removeMany(
    instances: TAssociatedModel[],
    options?: AssociationActionOptions,
  ) {
    return this.withSafeTransaction<unknown>(
      options.transaction,
      ({ transaction }) => {
        return this.parentThis.$remove<TAssociatedModel>(
          this.associationKey as string,
          instances,
          { transaction, ...options },
        );
      },
    );
  }

  async createMany(
    instances: TCreateInstanceBody[],
    options: AssociationCreateOptions = {},
  ) {
    return this.withSafeTransaction<TAssociatedModel[]>(
      options.transaction,
      ({ transaction }) => {
        return Promise.all(
          instances.map((instance) => {
            return this.create(
              // @ts-expect-error $create
              instance,
              { transaction, ...options },
            );
          }),
        );
      },
    );
  }

  count(options?: AssociationCountOptions) {
    return this.parentThis.$count(this.associationKey as string, options);
  }
}
