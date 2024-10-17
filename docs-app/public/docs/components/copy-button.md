# Examples

## Set Text Directly

```gjs live preview no-shadow
import { CopyButton } from 'ember-cli-clipboard';

const onSuccess = () => {
  alert('Text copied to clipboard successfully!');
};

const onError = () => {
  alert('Failed to copy text to clipboard.');
};

<template>
  <CopyButton
    @text='ember install ember-cli-clipboard'
    @title='copy to clipboard'
    @onSuccess={{onSuccess}}
    @onError={{onError}}
  >
    <i class='copy'>copy</i>
  </CopyButton>
</template>
```

## Lazily Set Text From Action

```gjs live preview no-shadow
import { CopyButton } from 'ember-cli-clipboard';
import { v1 as uuidv1 } from 'uuid';

const onSuccess = () => {
  alert('Text copied to clipboard successfully!');
};

const onError = () => {
  alert('Failed to copy text to clipboard.');
};

const generateToken = () => {
  return uuidv1();
};

<template>
  <CopyButton
    @title='copy to clipboard'
    @text={{generateToken}}
    @onSuccess={{onSuccess}}
    @onError={{onError}}
  >
    Generate & Copy Token
  </CopyButton>
</template>
```

## Get Text From Target Element

```gjs live preview no-shadow
import { CopyButton } from 'ember-cli-clipboard';

const onSuccess = () => {
  alert('Text copied to clipboard successfully!');
};

const onError = () => {
  alert('Failed to copy text to clipboard.');
};

<template>
  <input
    id='url'
    type='text'
    value='https://github.com/jkusa/ember-cli-clipboard'
  />
  <CopyButton @target='#url' @onSuccess={{onSuccess}} @onSuccess={{onError}}>
    Copy URL
  </CopyButton>
</template>
```

## Get Text From Dynamic Target

```gjs live preview no-shadow
import { CopyButton } from 'ember-cli-clipboard';

class State {
  get getTarget() {
    return `#${document.querySelector('#url-text')?.id}`;
  }
}

const state = new State();

const onSuccess = () => {
  alert('Text copied to clipboard successfully!');
};

const onError = () => {
  alert('Failed to copy text to clipboard.');
};

<template>
  <input
    id='url-text'
    type='text'
    value='https://jkusa.github.io/ember-cli-clipboard'
  />
  <CopyButton
    @target={{state.getTarget}}
    @onSuccess={{onSuccess}}
    @onError={{onError}}
  >
    Copy URL
  </CopyButton>
</template>
```

## Cut Text From Target Element

```gjs live preview no-shadow
import { CopyButton } from 'ember-cli-clipboard';

const onSuccess = () => {
  alert('Text copied to clipboard successfully!');
};

const onError = () => {
  alert('Failed to copy text to clipboard.');
};

<template>
  <textarea id='textarea'>Lorem ipsum dolor sit amet, consectetur...</textarea>

  <CopyButton
    @target='#textarea'
    @action='cut'
    @success={{onSuccess}}
    @error={{onError}}
  >
    Copy URL
  </CopyButton>
</template>
```

## API Reference

```gjs live no-shadow
import { ComponentSignature } from 'kolay';

<template>
  <ComponentSignature
    @package='ember-cli-clipboard'
    @module='declarations/components/copy-button'
    @name='default'
  />
</template>
```
