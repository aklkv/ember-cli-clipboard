import { CopyButton, isClipboardSupported } from 'ember-cli-clipboard';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "TestApp"}}

  <h2 id="title">Welcome to Ember</h2>

  <CopyButton @text="ember install ember-cli-clipboard">
    Copy Me!
  </CopyButton>

  <p class="application__supported-text">
    {{#if (isClipboardSupported)}}
      <span>
        Clipboard
        <span class="application__is-supported">is</span>
        supported
      </span>
    {{else}}
      <span>
        Clipboard
        <span class="application__is-supported">is not</span>
        supported
      </span>
    {{/if}}
  </p>
</template>
