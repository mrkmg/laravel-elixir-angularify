/**
 * laravel-elixir-angularify
 *
 * Author: Kevin Gravier <kevin@mrkmg.com>
 * License: MIT
 */

var Gulp = require('gulp');
var Elixir = require('laravel-elixir');

var Print = require('gulp-print');
var NgHtml2Js = require("gulp-ng-html2js");
var MinifyHtml = require("gulp-minify-html");
var Extend = require('extend');
var Uglify = require("gulp-uglify");
var Concat = require("gulp-concat");


var $ = Elixir.Plugins;
var config = Elixir.config;

Elixir.extend('angularify', function (options)
{
    options = Extend({
        moduleName: 'CompiledTemplates',
        prefix: '/templates/',
        search: '**/*.html',
        dest: 'public/js/',
        src: 'public/templates/'
    }, options);

    new Elixir.Task('angularify', function ()
    {
        return Gulp
            .src(options.src + options.search)
            .pipe(Print())
            .pipe($.if(config.production, MinifyHtml({
                empty: true,
                spare: true,
                quotes: true
            })))
            .pipe(NgHtml2Js({
                moduleName: options.moduleName,
                prefix: options.prefix
            }))
            .pipe(Concat(options.moduleName + ".js"))
            .pipe($.if(config.production, Uglify()))
            .pipe(Gulp.dest(options.dest))
            .pipe(Print());
    }).watch([options.src + options.search]);
});