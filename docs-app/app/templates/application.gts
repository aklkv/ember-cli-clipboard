import { pageTitle } from 'ember-page-title';
import { PageNav } from 'kolay/components';
import { pascalCase, sentenceCase } from 'change-case';

import './styles.css';

import type { Page } from 'kolay';

<template>
  {{pageTitle "ember-cli-clipboard"}}

  <div class="docs-container">
    <div class="layout">
      <aside class="layout__sidebar nav">
        <PageNav>
          <:page as |x|>
            <x.Link class="layout__link">
              {{nameFor x.page}}
            </x.Link>
          </:page>
          <:collection as |x|>
            {{#if x.index}}
              <x.index.Link class="layout__link">
                {{sentenceCase x.collection.name}}
              </x.index.Link>
            {{else}}
              <span class="layout__text">
                {{sentenceCase x.collection.name}}
              </span>
            {{/if}}
          </:collection>
        </PageNav>
      </aside>

      <main class="layout__main">
        <div class="main__content">
          {{outlet}}
        </div>
      </main>
    </div>
  </div>

  <footer class="site-footer">
    <p>&copy;
      {{year}}
      Built with ❤️ and Ember by
      <a href="https://github.com/jkusa">@jkusa</a>
    </p>
  </footer>
</template>

const year = new Date().getFullYear();

function nameFor(x: Page) {
  // We defined componentName via json file

  if ('componentName' in x && typeof x.componentName === 'string') {
    return `${x.componentName}`;
  }

  if (x.path.includes('/components/')) {
    return `<${pascalCase(x.name)} />`;
  }

  return sentenceCase(x.name);
}
