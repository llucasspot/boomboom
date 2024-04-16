import { Dispatch, SetStateAction, useState } from "react";

export type Value<TValue> = {
  get: TValue;
  set: Dispatch<SetStateAction<TValue>>;
};
export function useValue<TValue>(initialValue: TValue): Value<TValue> {
  const [value, setValue] = useState(initialValue);
  return { get: value, set: setValue };
}
