// Based on mdoc default template
// author: Miller Medeiros
// license: MIT
// version : 0.2.0 (2013/01/10)


(function ($) {


    var DEFAULT_BRUSH = 'js',
        VERSION_TAG = 'master',
        _srcUrl = 'https://github.com/mout/mout/blob/'+ VERSION_TAG +'/src/',
        _specsUrl = 'https://github.com/mout/mout/blob/'+ VERSION_TAG +'/tests/spec/',
        _rawUrl = 'https://raw.github.com/mout/mout/'+ VERSION_TAG +'/src',
        _curPath = document.location.pathname.split('/'),
        _curFile = _curPath[_curPath.length - 1],
        _curPackage = _curFile.split('.')[0],
        _rootPath = '';


    var sidebar = (function () {

        var $_sidebar,
            $_search,
            $_toc,
            $_tocList,
            $_tocItems;


        function init() {
            $_sidebar = $('<div id="sidebar" />').prependTo('#wrapper');
            $_sidebar.load(_rootPath +'sidebar_.html', onTocLoad);
        }

        function onTocLoad(data) {
            $_search = $('#search');
            $_toc = $_sidebar.find('.toc');
            $_tocList = $_toc.find('.toc-list');
            $_tocItems = $_tocList.find('.toc-item');

            //fix links if page is on a nested folder
            $_sidebar.find('a').each(function(){
                var $el = $(this), href = $el.attr('href');
                $el.attr('href', _rootPath + href);
            });

            $_tocList.slideUp(0);
            $_sidebar.on('click', 'h3', toggleNavOnClick);
            $('#show-desc').on('change', toggleDescription);
            toggleDescription();
            $_search.on('keyup blur', filterOnSearch);

            $_sidebar.find('.toc-mod-title:has(a[href*="'+ _curFile +'"])').click();

        }

        function toggleNavOnClick(evt) {
            var $el = $(this);
            $el.toggleClass('opened');
            $el.next('.toc-list').stop(true, true).slideToggle(300);
        }

        function toggleDescription() {
            $_toc.find('.desc').toggleClass('hidden');
        }

        function filterOnSearch(evt) {
            var term = $_search.val(),
                rTerm;

            $_tocItems.toggleClass('hidden', !!term);
            $_toc
                .find('.toc-mod-title')
                .toggleClass('hidden', !!term)
                .removeClass('opened');

            if(term){
                rTerm = new RegExp(term, 'gi');
                $_toc.find('.toc-mod-title').addClass('hidden');

                $_tocList.stop(true).slideDown(0);

                $_tocItems
                    .filter(function(){
                        return rTerm.test( $(this).text() );
                    })
                    .removeClass('hidden');

            } else {
                $_tocList.stop(true).slideUp(0);
            }

        }

        return {
            init : init
        };

    }());


    // ---

    var syntax = {

        init : function(){

            var brushesPath = _rootPath +'assets_/js/lib/syntax-highlighter/';

            var brushes = [
                    'applescript            {{path}}shBrushAppleScript.js',
                    'actionscript3 as3      {{path}}shBrushAS3.js',
                    'bash shell             {{path}}shBrushBash.js',
                    'coldfusion cf          {{path}}shBrushColdFusion.js',
                    'cpp c                  {{path}}shBrushCpp.js',
                    'c# c-sharp csharp      {{path}}shBrushCSharp.js',
                    'css                    {{path}}shBrushCss.js',
                    'delphi pascal          {{path}}shBrushDelphi.js',
                    'diff patch pas         {{path}}shBrushDiff.js',
                    'erl erlang             {{path}}shBrushErlang.js',
                    'groovy                 {{path}}shBrushGroovy.js',
                    'java                   {{path}}shBrushJava.js',
                    'jfx javafx             {{path}}shBrushJavaFX.js',
                    'js jscript javascript  {{path}}shBrushJScript.js',
                    'perl pl                {{path}}shBrushPerl.js',
                    'php                    {{path}}shBrushPhp.js',
                    'text plain             {{path}}shBrushPlain.js',
                    'py python              {{path}}shBrushPython.js',
                    'ruby rails ror rb      {{path}}shBrushRuby.js',
                    'sass scss              {{path}}shBrushSass.js',
                    'scala                  {{path}}shBrushScala.js',
                    'sql                    {{path}}shBrushSql.js',
                    'vb vbnet               {{path}}shBrushVb.js',
                    'xml xhtml xslt html    {{path}}shBrushXml.js'
                ];

            brushes = $.map(brushes, function(val){
                return val.replace('{{path}}', brushesPath);
            });

            $('pre:has(code)')
                .addClass('brush:'+ DEFAULT_BRUSH)
                .find('code')
                .replaceWith(function(){
                    return $(this).text();
                });

            SyntaxHighlighter.defaults['auto-links'] = false;
            SyntaxHighlighter.defaults.gutter = false;
            SyntaxHighlighter.autoloader.apply(SyntaxHighlighter.autoloader, brushes);
            SyntaxHighlighter.all();

        }

    };


    var source = (function () {

        function init(){
            var mod,
                $h2 = $('h2'),
                $ul = $('<ul class="nav nav-src"><li><a href="#" class="a-src">Source</a></li><li><a href="#" class="a-specs">Specs</a></li></ul>'),
                $tmp;

            $h2.each(function(i, el){
                mod = ($(el).find('a').attr('href') || '').replace('#', '');
                if (mod && mod !== 'toc') {
                    $tmp = $ul.clone();
                    $tmp.find('.a-src').attr('href', _srcUrl + _curPackage +'/'+ mod +'.js');
                    $tmp.find('.a-specs').attr('href', _specsUrl + _curPackage +'/spec-'+ mod +'.js');
                    $(this).append($tmp).addClass('h2-mod');
                }
            });
        }

        return {
            init : init
        };
    }());



    // inject module
    // so the user can test modules on the console
    var inject = (function(){

        var _didInjected;

        function injectPackageOnClick(evt){
            evt.preventDefault();

            var packageName = prompt('Module Name:', _curPackage);
            if (! packageName) return;

            packageName = 'mout/'+ packageName;

            // can only call once
            if (_didInjected) {
                require([packageName], function(){
                    registerLoad(packageName);
                });
            } else {
                injectRequireJs(packageName);
                _didInjected = true;
            }
        }


        function registerLoad(packageName){
            var pkg = require(packageName);
            window.mout = window.mout || {};
            if (typeof pkg === 'object') {
                for (var key in pkg) {
                    window.mout[key] = pkg[key];
                }
            } else {
                var nameParts = packageName.split('/');
                window.mout[ nameParts[nameParts.length - 1] ] = pkg;
            }
            if (console && console.log) {
                console.log(' == You can now access "'+ packageName +'" inside the global "mout" namespace. == ');
            }
        }


        function injectRequireJs(packageName){
            window.requirejs = {
                paths : {
                    'mout' : _rawUrl
                },
                deps : [packageName],
                callback : function() {
                    registerLoad(packageName);
                }
            };
            var s = document.createElement('script');
            s.src = $('body').data('rootPath') + 'assets_/js/lib/require.js';
            var s1 = document.getElementsByTagName('script')[0];
            s1.parentNode.insertBefore(s, s1);
        }


        function init(){
            $('#inject-link').click(injectPackageOnClick);
        }


        return {
            init : init
        };
    }());


    // ----


    function init(){
        _rootPath = $('body').data('rootPath'); //fix relative links on nested paths
        sidebar.init();
        syntax.init();
        if(_curPackage !== 'index'){
            source.init();
            inject.init();
        }
    }

    $(document).ready(init);

}(jQuery));
