import {useRef} from "react";

export type Observer = React.MutableRefObject<{
    subscriptions: ((isYes: boolean) => void)[],
    subscribe: (callback: (isYes: boolean) => void) => (isYes: boolean) => void,
    unsubscribe: (callback: (isYes: boolean) => void) => void,
    publish: (isYes: boolean) => void
}>

export function useObserver() {
    const ref = useRef({
        subscriptions: [] as ((isYes: boolean) => void)[],
        subscribe: (callback: (isYes: boolean) => void) => {
            ref.current.subscriptions.push(callback);
            return callback;
        },
        unsubscribe: (callback: (isYes: boolean) => void) => {
            ref.current.subscriptions = ref.current.subscriptions.filter((cb) => cb !== callback);
        },
        publish: (isYes: boolean) => {
            ref.current.subscriptions.forEach((cb) => cb(isYes));
        }
    });
    return ref;
}
