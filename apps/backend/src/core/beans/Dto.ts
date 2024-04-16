export abstract class Dto<T extends Dto<object>> {
  constructor(instance: T) {
    Object.assign(this, instance);
  }
}

export abstract class ResponseDto<T extends Dto<object>> extends Dto<T> {}
