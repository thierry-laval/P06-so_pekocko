'use strict';

const mockgoose = require('mockgoose');
const Mongoose = require('mongoose').Mongoose;
const mongoose = new Mongoose();

const sanitizerPlugin = require('../lib/sanitizer-plugin');

const userData = {
    firstName: '<script>alert(2)</script>',
    lastName: '<p>Name</p>'
};

describe('Mongoose Sanitizer', () => {
    beforeAll(done => {
        mockgoose(mongoose).then(() => {
            mongoose.connect('mongodb://localhost:27017/sanitizer-plugin-test', done);
        });
    });

    afterEach(done => {
        mockgoose.reset(done);
    });

    it('should escape all field', done => {
        const Schema = mongoose.Schema({
            firstName: String,
            lastName: String
        });

        Schema.plugin(sanitizerPlugin);

        const User = mongoose.model('User0', Schema);
        const user = new User(userData);

        user.save((err, result) => {
            expect(result.firstName).toEqual('&lt;script&gt;alert(2)&lt;/script&gt;');
            expect(result.lastName).toEqual('&lt;p&gt;Name&lt;/p&gt;');

            done();
        });
    });

    it('should escape only included fields', done => {
        const Schema = mongoose.Schema({
            firstName: String,
            lastName: String
        });

        Schema.plugin(sanitizerPlugin, { include: ['firstName'] });

        const User = mongoose.model('User1', Schema);
        const user = new User(userData);

        user.save((err, result) => {
            expect(result.firstName).toEqual('&lt;script&gt;alert(2)&lt;/script&gt;');
            expect(result.lastName).toEqual('<p>Name</p>');

            done();
        });
    });

    it('should escape all fields except excluded ones', done => {
        const Schema = mongoose.Schema({
            firstName: String,
            lastName: String
        });

        Schema.plugin(sanitizerPlugin, { exclude: ['firstName'] });

        const User = mongoose.model('User2', Schema);
        const user = new User(userData);

        user.save((err, result) => {
            expect(result.firstName).toEqual('<script>alert(2)</script>');
            expect(result.lastName).toEqual('&lt;p&gt;Name&lt;/p&gt;');

            done();
        });
    });

    it('should sanitize included field', done => {
        const Schema = mongoose.Schema({
            firstName: String,
            lastName: String
        });

        Schema.plugin(sanitizerPlugin, { mode: 'sanitize' });

        const User = mongoose.model('User3', Schema);
        const user = new User(userData);

        user.save((err, result) => {
            expect(result.firstName).toEqual('');
            expect(result.lastName).toEqual('<p>Name</p>');

            done();
        });
    });

    it('should escape or sanitize properties, depending on config', done => {
        const Schema = mongoose.Schema({
            firstName: String,
            lastName: String
        });

        Schema.plugin(sanitizerPlugin, [
            {
                mode: 'sanitize',
                include: 'firstName'
            },
            {
                mode: 'escape',
                exclude: ['firstName']
            }
        ]);

        const User = mongoose.model('User4', Schema);
        const user = new User(userData);

        user.save((err, result) => {
            expect(result.firstName).toEqual('');
            expect(result.lastName).toEqual('&lt;p&gt;Name&lt;/p&gt;');

            done();
        });
    });
});