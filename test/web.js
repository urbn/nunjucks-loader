var chai = require('chai');
var should = chai.should();

describe('path resolution', function() {

    it('should resolve paths using webpack resolve', function() {
        var tpl1 = require('./fixtures/templates/child.nunj');
        var tpl2 = require('child.nunj');

        tpl1.render.should.be.a.Function;
        tpl2.render.should.be.a.Function;
        tpl1.render().should.equal(tpl2.render());
    });

});


describe('template inheritance', function() {

    beforeEach(function() {
        this.tpl = require('child.nunj');
    });

    it('should inherit from parent template', function() {
        this.tpl.render.should.be.a.Function;
    });

    it('should render a default argument', function() {
        var result = this.tpl.render();
        result.should.be.a.String
        result.should.contain('hello world');
        result.should.contain('<div class="content">')
    });

    it('should render using the data context', function() {
        var context = { name: 'everyone'};
        var result = this.tpl.render(context);
        result.should.be.a.String
        result.should.contain('hello ' + context.name);
    });

});


describe('environment config', function() {

    describe('filters', function() {

        before(function() {
            this.tpl = require('standard-filter.nunj');
        });

        it('should register "double" filter', function() {
            this.tpl.render.should.be.a.Function;
        });

        it('should render (a)sync', function(done) {
            this.tpl.render({number: 2}).should.equal('4');
            this.tpl.render({number: 20}, function(err, result) {
                should.not.exist(err);
                result.should.equal('40');
                done();
            });
        });

    });

    describe('filters [async]', function() {

        before(function() {
            this.tpl = require('async-filter.nunj');
        });

        it('should add "square" async filter', function() {
            this.tpl.render.should.be.a.Function;
        });

        it('should render async only', function(done) {
            should.not.exist(this.tpl.render());
            this.tpl.render({ number: 2 }, function(err, result) {
                should.not.exist(err);
                result.should.be.a.Number;
                done();
            });
        });

    });

});