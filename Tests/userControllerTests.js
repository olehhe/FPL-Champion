var should = require('should');
var sinon = require('sinon');

describe('User Controller Tests', () => {

    describe('POST', () => {

        it('Should not allow creation without name', () => {
            var User = function (user) {
                this.save = () => {};
            };

            var req = {
                body: {
                    email: 'test@test.com'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var userController = require('../Controllers/userController')(User);
            userController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args);
            res.send.calledWith('Name and Email is required').should.equal(true);
        });

        it('Should not allow cration without email', () => {
            var User = function (user) {
                this.save = () => {};
            };

            var req = {
                body: {
                    name: 'Test Testerson'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var userController = require('../Controllers/userController')(User);
            userController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args);
            res.send.calledWith('Name and Email is required').should.equal(true);
        });

        it('Should allow creation without players', () => {
            var User = function (user) {
                this.save = () => {};
            };

            var req = {
                body: {
                    name: "Test Testerson",
                    email: "test@test.com"
                }
            };

            res = {
                status: sinon.spy(),
                send: () => {}
            };

            var userController = require('../Controllers/userController')(User);
            userController.post(req, res);

            res.status.calledWith(201).should.equal(true, 'Bad status ' + res.status.args);
        });

    });

});