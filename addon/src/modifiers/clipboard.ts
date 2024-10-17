import ClipboardJS from 'clipboard';
import { modifier } from 'ember-modifier';
import { isBlank } from '@ember/utils';
import { guidFor } from '@ember/object/internals';

const CLIPBOARD_EVENTS = ['success', 'error'];

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * ```gjs
 * import { clipboard } from 'ember-cli-clipboard';
 *
 * const onSuccess = () => {
 *   alert('Text copied to clipboard successfully!');
 * };
 *
 * <template>
 *   <button
 *     class='application__copy-button'
 *     type='button'
 *     {{clipboard text='element modifier' onSuccess=onSuccess}}
 *   >
 *     Copy Text
 *   </button>
 * </template>
 * ```
 */
export interface ClipboardModifierSignature {
  Args: {
    Named: {
      /**
       * The action to perform, either 'copy' or 'cut'.
       * Defaults to 'copy'.
       */
      action?: 'copy' | 'cut';
      /**
       * The container element for the clipboard action.
       * Can be a string selector or an HTMLElement.
       */
      container?: string;
      /**
       * If true, the click event is scoped to this element.
       * If false, it is scoped to document.body (ClipboardJS default).
       * Defaults to true.
       */
      delegateClickEvent?: boolean;
      /**
       * The target element to copy from.
       * Can be a string selector or an HTMLElement.
       * If not provided, the text attribute will be used.
       */
      target?: string;
      /**
       * The text to copy to the clipboard.
       * If provided, it overrides the target attribute.
       * Can be a string or a function that returns a string.
       */
      text?: string;
      /**
       * Callback function to execute on successful copy.
       * Receives the ClipboardJS event as an argument.
       */
      onSuccess?: (...args: unknown[]) => void;
      /**
       * Callback function to execute on copy error.
       * Receives the ClipboardJS event as an argument.
       */
      onError?: (...args: unknown[]) => void;
    };
  };
  Element: HTMLElement | HTMLButtonElement;
}

const clipboardModifier = modifier<ClipboardModifierSignature>(
  (element, params, hash) => {
    const {
      action = 'copy',
      container,
      /*
       * delegateClickEvent true - scope event listener to this element
       * delegateClickEvent false - scope event listener to document.body (ClipboardJS)
       */
      delegateClickEvent = true,
      target,
      text,
    } = hash;

    element.setAttribute('data-clipboard-action', action);

    if (!isBlank(text) && text) {
      element.setAttribute('data-clipboard-text', text);
    }
    if (!isBlank(target) && target) {
      element.setAttribute('data-clipboard-target', target);
    }

    if (isBlank(element.dataset['clipboardId'])) {
      element.setAttribute('data-clipboard-id', guidFor(element));
    }

    const trigger =
      delegateClickEvent === false
        ? element
        : `[data-clipboard-id=${element.dataset['clipboardId']}]`;

    const clipboard = new ClipboardJS(trigger, {
      text: typeof text === 'function' ? text : undefined,
      // @ts-expect-error: ClipboardJS types are not accurate
      container:
        typeof container === 'string'
          ? document.querySelector(container)
          : container,
      // @ts-expect-error: ClipboardJS types are not accurate
      target,
    });

    CLIPBOARD_EVENTS.forEach((event) => {
      clipboard.on(event, () => {
        if (!(element instanceof HTMLButtonElement) || !element.disabled) {
          // @ts-expect-error: ClipboardJS types are not accurate
          const action = hash[`on${capitalize(event)}`] as
            | ((...args: unknown[]) => void)
            | undefined;
          if (action) {
            action();
          }
        }
      });
    });

    return () => clipboard.destroy();
  },
);

export default clipboardModifier;
