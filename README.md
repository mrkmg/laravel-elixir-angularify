Laravel Elixir Angularify
============================

Current Version: 0.0.1

A Laravel Elixir mix to compile HTML into an Angular module to reduce the number of requests to a server to fetch html.

    var elixir = require('laravel-elixir');

    require('laravel-elixir-angularify');

    elixir(function (mix) {
        mix.angularify();
    });

Then, in your angular project:

    angular.module('MyApp', [
        'CompiledTemplates'
    ]);

    <div ng-include="/templates/name-of-html-file.html"></div>


How to Install
--------------

    npm install --save laravel-elixir-angularify

Full Featured Example
---------------------

Example with all *(default)* options:

    var elixir = require('laravel-elixir');

    require('laravel-elixir-angularify');

    elixir(function (mix) {
        mix
            .angularify({
                moduleName: 'CompiledTemplates', // The module Name
                prefix: '/templates/', // Prefix to path (used inside angular)
                search: '**/*.html', // Files to include, this shouldn't need to change
                dest: 'public/js/', // Destination folder
                src: 'public/templates/' // Source folder
            });
    });

Then run `gulp`

License: MIT