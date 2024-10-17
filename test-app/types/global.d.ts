import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberCliClipboardRegistry from 'ember-cli-clipboard/template-registry';
declare module '@glint/environment-ember-loose/registry' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export default interface Registry extends EmberCliClipboardRegistry {}
}
