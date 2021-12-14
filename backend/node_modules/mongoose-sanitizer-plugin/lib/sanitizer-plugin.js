'use strict';

const sanitizer = require('sanitizer');

const defaults = {
    mode: 'escape',
    include: [],
    exclude: []
};

function sanitizerPlugin(schema, options = {}) {
    const configs = asArray(options).map(item => {
        const option = Object.assign({}, defaults, item);

        const props = (() => {
            const include = asArray(option.include);
            const exclude = asArray(option.exclude);

            const keys = include.length > 0 ? include : stringKeys(schema);
            if (exclude.length > 0) {
                return keys.filter(p => p.indexOf(exclude) === -1);
            }
            return keys;
        })();

        return { mode: option.mode, props };
    });

    return schema.pre('save', function (next) {
        configs.forEach(config => {
            config.props.forEach(key => this[key] = sanitizer[config.mode](this[key]));
        });
        next();
    });
}

function asArray(value) {
    return value ? (Array.isArray(value) ? value : [value]) : [];
}

function stringKeys(schema) {
    return Object.keys(schema.paths).filter(key => {
        const path = schema.path(key);
        return path.instance === 'String';
    });
}

module.exports = exports = sanitizerPlugin;