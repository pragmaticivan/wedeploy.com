/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from index.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace pageDocsIndex.
 * @public
 */

goog.module('pageDocsIndex.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
/** @suppress {extraRequire} */
goog.require('goog.string');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;

var $templateAlias2 = Soy.getTemplate('ElectricSearchAutocomplete.incrementaldom', 'render');

var $templateAlias1 = Soy.getTemplate('docs.incrementaldom', 'render');


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  var param323 = function() {
    $topics(opt_data, null, opt_ijData);
  };
  $templateAlias1(soy.$$assignDefaults({content: param323}, opt_data), null, opt_ijData);
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'pageDocsIndex.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $topics(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'container-hybrid docs-home-top');
    ie_open('div', null, null,
        'class', 'row');
      ie_open('div', null, null,
          'class', 'col-xs-16');
        ie_open('h1', null, null,
            'class', 'docs-home-top-title');
          itext('WeDeploy ');
          ie_open('span');
            itext('Docs Center');
          ie_close('span');
        ie_close('h1');
        ie_open('p', null, null,
            'class', 'docs-home-top-description');
          itext('Start learning how to leverage the power of ');
          var dyn22 = opt_data.site.title;
          if (typeof dyn22 == 'function') dyn22(); else if (dyn22 != null) itext(dyn22);
          itext(' in your project.');
        ie_close('p');
      ie_close('div');
    ie_close('div');
    ie_open('div', null, null,
        'class', 'row');
      ie_open('div', null, null,
          'class', 'container-hybrid');
        ie_open('div', null, null,
            'class', 'row');
          ie_open('div', null, null,
              'class', 'col-xs-14 col-xs-offset-1 col-md-10 col-md-offset-3 col-lg-6 col-lg-offset-5');
            ie_open('div', null, null,
                'class', 'search');
              $templateAlias2({maxResults: 3, path: '/docs/', placeholder: 'Enter a search term here'}, null, opt_ijData);
            ie_close('div');
          ie_close('div');
        ie_close('div');
      ie_close('div');
    ie_close('div');
  ie_close('div');
  ie_open('div', null, null,
      'class', 'docs-home-topics');
    ie_open('div', null, null,
        'class', 'container-hybrid');
      ie_open('div', null, null,
          'class', 'row');
        ie_open('div', null, null,
            'class', 'col-xs-16');
          ie_open('section', null, null,
              'class', 'docs-home-middle');
            ie_open('h2', null, null,
                'class', 'docs-home-middle-subtitle');
              itext('Choose a Guide');
            ie_close('h2');
            ie_open('p', null, null,
                'class', 'docs-home-middle-description');
              itext('Each one provide step by step coverage for every core feature.');
            ie_close('p');
          ie_close('section');
        ie_close('div');
      ie_close('div');
      ie_open('div', null, null,
          'class', 'row');
        ie_open('div', null, null,
            'class', 'col-md-12 col-md-offset-2 col-xs-16');
          ie_open('div', null, null,
              'class', 'row');
            var topicList344 = opt_data.site.index.children[1].children;
            var topicListLen344 = topicList344.length;
            for (var topicIndex344 = 0; topicIndex344 < topicListLen344; topicIndex344++) {
              var topicData344 = topicList344[topicIndex344];
              if (! topicData344.hidden) {
                ie_open('div', null, null,
                    'class', 'col-md-8 col-md-offset-0 col-xs-14 col-xs-offset-1');
                  ie_open('a', null, null,
                      'class', 'topic radial-out',
                      'href', topicData344.url);
                    ie_open('div', null, null,
                        'class', 'topic-icon');
                      ie_void('span', null, null,
                          'class', 'icon-16-' + topicData344.icon);
                    ie_close('div');
                    ie_open('h3', null, null,
                        'class', 'topic-title');
                      var dyn23 = topicData344.title;
                      if (typeof dyn23 == 'function') dyn23(); else if (dyn23 != null) itext(dyn23);
                    ie_close('h3');
                  ie_close('a');
                ie_close('div');
              }
            }
          ie_close('div');
        ie_close('div');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.topics = $topics;
if (goog.DEBUG) {
  $topics.soyTemplateName = 'pageDocsIndex.topics';
}

exports.render.params = ["site"];
exports.render.types = {"site":"any"};
exports.topics.params = ["site"];
exports.topics.types = {"site":"any"};
templates = exports;
return exports;

});

class pageDocsIndex extends Component {}
Soy.register(pageDocsIndex, templates);
export { pageDocsIndex, templates };
export default templates;
/* jshint ignore:end */
