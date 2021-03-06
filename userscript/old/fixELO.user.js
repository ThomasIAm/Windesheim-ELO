// ==UserScript==
// @name          Windesheim ELO Fix
// @namespace     https://github.com/Bloemendaal
// @description   Make the ELO great (again)!
// @author        Casper Bloemendaal
// @license       MIT
// @downloadURL   https://github.com/Bloemendaal/Windesheim-ELO/raw/master/old/ELO.user.js
// @updateURL     https://github.com/Bloemendaal/Windesheim-ELO/raw/master/old/ELO.user.js
// @supportURL    https://github.com/Bloemendaal/Windesheim-ELO/issues
// @version       0.5
// @match         https://elo.windesheim.nl/Start.aspx
// @grant         none
// @run-at        document-end
// @noframes
// ==/UserScript==

(function() {
   'use strict';

   document.getElementById('tns').addEventListener("load", function(){
      function continueB(el) {
         try {
            var c = el.contentWindow.document.getElementsByClassName('WidgetIframe');
         } catch(err) {
            c = [];
         }

         if (c.length) {
            continueC(c);
         } else {
            el.addEventListener("load", function(){
               c = this.contentWindow.document.getElementsByClassName('WidgetIframe');
               if (c) {
                  continueC(c);
               }
            });
         }
      }

      function continueC(el) {
         Array.prototype.forEach.call(el, d => {
            d.addEventListener("load", function(){
               this.style.height = (d.contentWindow.document.body.scrollHeight + 20) + 'px';
            });
            d.style.height = (d.contentWindow.document.body.scrollHeight + 20) + 'px';
         });
      }

      var observer = new MutationObserver(function(mutations) {
         document.getElementById('tns').contentWindow.document.querySelectorAll('.StudyRoutePageViewer > iframe').forEach(function(a){
            try {
               var b = this.contentWindow.document.getElementById('widgetsiframe');
            } catch(err) {
               b = null;
            }
            if (b) {
               continueB(b);
            } else {
               a.addEventListener("load", function() {
                  var b = this.contentWindow.document.getElementById('widgetsiframe');
                  if (b) {
                     continueB(b);
                  }
               });
            }

            try {
               a.contentWindow.document.getElementsByClassName('detailintro')[0].remove();
            } catch(err) {
               a.addEventListener("load", function() {
                  var r = this.contentWindow.document.getElementsByClassName('detailintro')[0];
                  if (r) {
                     r.remove();
                  }
               });
            }

         });
      });

      observer.observe(document.getElementById('tns').contentWindow.document.body, {
         attributes: true,
         childList: true,
         characterData: true
      });
   });

})();
