import { Model as SequelizeModel } from 'sequelize-typescript';
import { AssociationGetOptions } from 'sequelize-typescript/dist/model/model/association/association-get-options';
import { Transaction } from 'sequelize';
import { Attributes } from 'sequelize/types/model';
import { AssociationCreateOptions } from 'sequelize-typescript/dist/model/model/association/association-create-options';

export type Nullable<T> = T | null | undefined;

export type Entity = { id: string; creationDate: Date; updatedOn: Date };

export abstract class AssociationI<
  TModel extends SequelizeModel<Entity, Entity>,
  K extends keyof TModel,
  TAssociatedModel extends SequelizeModel<Entity, Entity>,
  KAssociatedModel extends keyof TAssociatedModel,
  TCreateInstanceBody = Omit<
    Attributes<TAssociatedModel>,
    keyof Entity | KAssociatedModel
  >,
> {
  protected singularAssociationKey: string;

  constructor(
    protected parentThis: TModel,
    protected associationKey: K,
  ) {
    this.singularAssociationKey = this.buildSingularKey(<string>associationKey);
  }

  get(options?: AssociationGetOptions) {
    return this.parentThis.$get(this.associationKey, options);
  }

  async create(
    instance: TCreateInstanceBody,
    options: AssociationCreateOptions = {},
  ) {
    return this.withSafeTransaction<TAssociatedModel>(
      options.transaction,
      ({ transaction }) => {
        return this.parentThis.$create<TAssociatedModel>(
          this.singularAssociationKey as string,
          instance,
          { transaction, ...options },
        );
      },
    );
  }

  protected async getTransaction(transaction: Nullable<Transaction>): Promise<{
    transaction: Transaction;
    isTransactionNew: boolean;
  }> {
    if (transaction) {
      return { transaction, isTransactionNew: false };
    }
    const newtransaction = await this.getTransactionFromOptions();
    return {
      transaction: newtransaction,
      isTransactionNew: true,
    };
  }

  protected getTransactionFromOptions(options?: AssociationGetOptions) {
    if (options && options.transaction) {
      return options.transaction;
    }
    return this.parentThis.sequelize.transaction();
  }

  protected async withSafeTransaction<TResult>(
    _transaction: Nullable<Transaction>,
    cb: (transactionParams: {
      transaction: Transaction;
      isTransactionNew: boolean;
    }) => Promise<TResult>,
  ) {
    const { transaction, isTransactionNew } =
      await this.getTransaction(_transaction);
    try {
      const promise = await cb({ transaction, isTransactionNew });
      if (isTransactionNew) {
        await transaction.commit();
      }
      return promise;
    } catch (error) {
      if (isTransactionNew) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  private buildSingularKey(associationKey: string): string {
    if (associationKey.endsWith('s')) {
      return associationKey.slice(0, -1);
    }
    return associationKey;
  }
}
