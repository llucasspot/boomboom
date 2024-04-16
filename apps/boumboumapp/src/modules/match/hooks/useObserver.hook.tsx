import { ProfileData } from "@boumboum/swagger-backend";
import { useRef } from "react";

export type ActionState = {
  action: "like" | "dislike";
  user: ProfileData;
};

export type Observer<TState> = {
  subscriptions: ((state: TState) => void)[];
  subscribe: (callback: (state: TState) => void) => (state: TState) => void;
  unsubscribe: (callback: (state: TState) => void) => void;
  publish: (state: TState) => void;
};

export function useObserver<TState>(): Observer<TState> {
  const ref = useRef({
    subscriptions: [] as ((state: TState) => void)[],
    subscribe: (callback: (state: TState) => void) => {
      ref.current.subscriptions.push(callback);
      return callback;
    },
    unsubscribe: (callback: (state: TState) => void) => {
      ref.current.subscriptions = ref.current.subscriptions.filter(
        (cb) => cb !== callback,
      );
    },
    publish: (state: TState) => {
      ref.current.subscriptions.forEach((cb) => cb(state));
    },
  });
  return ref.current;
}
