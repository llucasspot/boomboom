import {
  Column,
  DataType,
  Table as SequelizeTable,
  Unique as STUnique,
} from 'sequelize-typescript';
import { NumberLength, StringLength } from './columns-enums';

function buildRequiredOptions(required: boolean) {
  return {
    allowNull: !required,
    validate: {
      notEmpty: !required,
    },
  };
}

export function ColumnUUID() {
  return Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  });
}

export function ColumnForeignUUID(required: boolean = true) {
  return Column({
    type: DataType.UUID,
    ...buildRequiredOptions(required),
  });
}

export function ColumnString(length: StringLength, required: boolean = true) {
  return Column({
    type: DataType.STRING(length),
    ...buildRequiredOptions(required),
  });
}

export function ColumnBoolean(defaultValue: boolean, required: boolean = true) {
  return Column({
    type: DataType.BOOLEAN,
    defaultValue: defaultValue,
    ...buildRequiredOptions(required),
  });
}

export function ColumnEnum(_enum: object, required: boolean = true) {
  return Column({
    type: DataType.ENUM(...Object.values(_enum)),
    ...buildRequiredOptions(required),
  });
}

export function ColumnEnumArray<T extends object>(
  _enum: object,
  propertyKey: keyof T,
  required: boolean = true,
) {
  return Column({
    type: DataType.ENUM(...Object.values(_enum)),
    defaultValue: '[]',
    get() {
      const value = this.getDataValue(propertyKey);
      return value ? JSON.parse(value) : [];
    },
    set(value: string[]) {
      this.setDataValue(propertyKey, JSON.stringify(value));
    },
    ...buildRequiredOptions(required),
  });
}

export function ColumnStringArray<T extends object>(
  propertyKey: keyof T,
  required: boolean = true,
) {
  return Column({
    type: DataType.STRING,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue(propertyKey);
      return value ? JSON.parse(value) : [];
    },
    set(value: string[]) {
      this.setDataValue(propertyKey, JSON.stringify(value));
    },
    ...buildRequiredOptions(required),
  });
}

export function Unique(indexesName: string) {
  const name = buildUniqueIndexesName(indexesName);
  return STUnique({
    name,
    msg: buildIndexesMsg(name),
  });
}

export function ColumnBcryptPassword() {
  // @ts-expect-error 72 in plain string and 60 in hashed string
  return ColumnString(60);
}

export function ColumnText(required: boolean = true) {
  return Column({
    type: DataType.TEXT,
    ...buildRequiredOptions(required),
  });
}

export function ColumnNumber(
  numberLength: NumberLength,
  required: boolean = true,
) {
  switch (numberLength) {
    case NumberLength.SMALL:
      return ColumnSmallNumber(required);
    case NumberLength.MEDIUM:
      return ColumnMediumNumber(required);
    case NumberLength.INTEGER:
    case NumberLength.PRICE:
      return ColumnIntegerNumber(required);
    default:
      return ColumnSmallNumber(required);
  }
}

function ColumnSmallNumber(required: boolean = true) {
  return Column({
    type: DataType.SMALLINT.UNSIGNED, // max : 65 535
    ...buildRequiredOptions(required),
  });
}

function ColumnMediumNumber(required: boolean = true) {
  return Column({
    type: DataType.MEDIUMINT.UNSIGNED, // max : 16 777 215
    ...buildRequiredOptions(required),
  });
}

function ColumnIntegerNumber(required: boolean = true) {
  return Column({
    type: DataType.INTEGER.UNSIGNED, // max : 4 294 967 295
    ...buildRequiredOptions(required),
  });
}

function buildUniqueIndexesName(indexesName: string) {
  return `uix_${indexesName}`;
}

function buildIndexesMsg(indexesName: string) {
  return `${indexesName}_msg`;
}

export function Table(tableName: string) {
  return SequelizeTable({ tableName });
}
