import {bubble, listen, SvelteComponent} from "svelte/internal";

export const getEventsAction = (component: SvelteComponent) => {
  return (node: EventTarget) => {
    const events = Object.keys(component.$$.callbacks);
    const listeners: Array<() => void> = [];

    events.forEach((event) =>
      listeners.push(listen(node, event, (e) => bubble(component, e)))
    );

    return {
      destroy: () => {
        listeners.forEach((listener) => listener());
      },
    };
  };
}
