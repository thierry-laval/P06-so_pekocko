# mongoose-sanitizer-plugin
Sanitizer for mongoose models.

Uses [Caja-HTML-Sanitizer](https://github.com/theSmaw/Caja-HTML-Sanitizer).

## Installation
`npm i mongoose-sanitizer-plugin --save`

## Options

Parameter     | Type                      | Default   | Description
------------- | ------------------------- | --------- | ------------
mode          | `String`                  | `escape`  | Enum: `sanitizer`, `escape`, `normalizeRCData`, `unescapeEntities`. See [Caja-HTML-Sanitizer](https://github.com/theSmaw/Caja-HTML-Sanitizer#use) docs.
include       | `String`, `Array<String>` | `[]`      | List of properties that will be sanitized.
exclude       | `String`, `Array<String>` | `[]`      | List of properties that won't be sanitized.

If both `include` and `exclude` are not specified then all string properties will be sanitized.

## Examples

Minimal usage:
```js
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
const mongoose = require('mongoose');
const SomeSchema = new mongoose.Schema({ /* ... */ });

SomeSchema.plugin(sanitizerPlugin);

mongoose.model('Some', SomeSchema);
```

Specifying your own options:
```js
SomeSchema.plugin(sanitizerPlugin, {
    mode: 'sanitize',
    include: ['firstName', 'lastName']
});
```

Specifying options with different mode for every group of properties:
```js
SomeSchema.plugin(sanitizerPlugin, [
    {
        mode: 'sanitizer',
        include: ['firstName', 'lastName']
    },
    {
        mode: 'escape',
        include: 'bio'
    }
]);
```