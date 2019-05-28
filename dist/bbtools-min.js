!function(){function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){return e(b[g][1][a]||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}return a}()({1:[function(a,b,c){"use strict";var d=Backbone.Collection.extend({collection_name:"",_first_page:"",_next_page:"",_prev_page:"",_last_page:"",_self_page:"",_selected:[],initialize:function(a){this.bind("add",function(a){a.bind("select",this.onSelectModel,this),a.bind("unselect",this.onUnSelectModel,this)},this)},delete_selected:function(){if(0==this._selected.length)var a="<h4>nessuna riga selezionata</h4>",b={message:a};else{var a="<h4>saranno eliminate le seguenti righe:</h4><ul>";_.each(this._selected,function(b){var c=this.get(b),d=c.getIdentifier();a=a+"<li><h5>"+d+"</h5></li>"},this),a+="</ul>",a+="<h4>si desidera proseguire?</h4>";var b={buttons:["yes","no"],message:a}}b.id="delete_selected";var c=new BbTools.View.Modal.Responsive(b);c.bind("modal.before.show",this.onEvent,this),c.bind("modal.show",this.onEvent,this),c.bind("modal.before.hide",this.onEvent,this),c.bind("modal.hide",this.onEvent,this),c.once("yes",this.onDeleteYes,this),c.show()},onEvent:function(a){},onDeleteYes:function(a){App.blockUI();_.each(this._selected,function(a){this.get(a).destroy({wait:!0,error:function(a,b,c){new BbTools.View.Modal.Responsive({id:"delete_failed_"+a.getIdentifier(),message:"<h4>la riga "+a.getIdentifier()+" non è stata eliminata</h4>"}).show()},success:function(a,b,c,d){new BbTools.View.Modal.Responsive({id:"delete_success_"+a.getIdentifier(),message:"<h4>la riga "+a.getIdentifier()+" è stata eliminata</h4>"}).show()}})},this),this._selected=[],this.fetch()},onSelectModel:function(a){this._selected.push(a.id),this._selected=_.uniq(this._selected)},onUnSelectModel:function(a){var b=this._selected.indexOf(a.id);b>-1&&this._selected.splice(b,1)},parse:function(a){return this.page=a.page,this.page_count=a.page_count,this.page_size=a.page_size,this.total_items=a.total_items,_.first(_.values(a._embedded))},first_page:function(){_.isString(this._links.first.href)&&(this.url=this._links.first.href,this.fetch())},prev_page:function(){_.isString(this._links.prev.href)&&(this.url=this._links.prev.href,this.fetch())},next_page:function(){_.isString(this._links.next.href)&&(this.url=this._links.next.href,this.fetch())},last_page:function(){_.isString(this._links.last.href)&&(this.url=this._links.last.href,this.fetch())},go_page:function(a){this.url=this._links.first.href,this.fetch({data:{page:a}})},goFetch:function(a){var b=this.url,c={};if(b.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function(a,b,d,e){a==b&&void 0===e?c.url=b:c[b]=e}),this.url=c.url,void 0===a)var a={};this.fetch(a)}});b.exports=d},{}],2:[function(a,b,c){"use strict";var d={enable:!1,log:function(a,b){0!=this.enable&&(void 0!==b?console.log([b,a]):console.log(a))}};b.exports=d},{}],3:[function(a,b,c){"use strict";var d=a("./Model"),e=a("../Collection/Collection"),f=d.extend({linksCollections:{},getLink:function(a){var b=this.attributes._links;if(_.isObject(b)&&_.has(b,a)){var c=_.propertyOf(b)(a);switch(c.type){case"collection":var d=e.extend({collection_name:a,url:c.href,model:f});break;case"entity":var d=f.extend({collection_name:a,url:c.href})}return new d}return!1}});b.exports=f},{"../Collection/Collection":1,"./Model":5}],4:[function(a,b,c){"use strict";var d=Backbone.Model.extend({bindModels:[],initialize:function(){this.on("change",this.onChange,this)},onChange:function(a,b){var c=this;_.mapObject(a.changed,function(a,b){c.bindModels.map(function(c){c.set(b,a)})})},bindModel:function(a){this.bindModels.push(a)}});b.exports=d},{}],5:[function(a,b,c){"use strict";var d=Backbone.Model.extend({initialize:function(a){this.bind("select",this.onSelect,this),this.bind("unselect",this.onUnSelect,this)},onSelect:function(a){},onUnSelect:function(a){},getIdentifier:function(){return this.id}});b.exports=d},{}],6:[function(a,b,c){"use strict";var d=a("./template/responsive.html"),e=Backbone.View.extend({tagName:"div",el:"body",events:{"click button#button-yes":"onYes","click button#button-no":"onNo","click button#button-ok":"onOk","click button#button-cancel":"onCancel"},title:"Attenzione",message:"",buttons:["chiudi"],id:"responsive",initialize:function(a){void 0!==a.template?this.template=a.template:this.template=_.template(d),void 0!==a.id&&(this.id=a.id),void 0!==a.title&&(this.title=a.title),void 0!==a.buttons&&(this.buttons=a.buttons),void 0!==a.message&&(this.message=a.message),"function"==typeof a.onClose&&(this.onClose=a.onClose)},render:function(){var a={id:this.id,title:this.title,buttons:this.buttons,message:this.message};return this.$("#"+this.id).remove(),this.$el.append(this.template(a)),this.delegateEvents(),this.$el.one("show.bs.modal",{this:this},this.onModalBeforeShow),this.$el.one("shown.bs.modal",{this:this},this.onModalShow),this.$el.one("hide.bs.modal",{this:this},this.onModalBeforeHide),this.$el.one("hidden.bs.modal",{this:this},this.onModalHide),this},show:function(){this.render(),this.$("#"+this.id).modal("show")},onYes:function(a){this.trigger("yes",a),this.$("#"+this.id).modal("hide"),this.offAll()},onNo:function(a){this.trigger("no",a),this.$("#"+this.id).modal("hide"),this.offAll()},onOk:function(a){this.trigger("ok",a),this.$("#"+this.id).modal("hide"),this.offAll()},onCancel:function(a){this.trigger("cancel",a),this.$("#"+this.id).modal("hide"),this.offAll()},onClose:function(a){this.trigger("modal.close",a),this.offAll()},onModalBeforeShow:function(a){a.data.this.trigger("modal.before.show",a)},onModalShow:function(a){a.data.this.trigger("modal.show",a)},onModalBeforeHide:function(a){a.data.this.trigger("modal.before.hide",a)},onModalHide:function(a){a.data.this.trigger("modal.hide",a)},offAll:function(){this.off("yes"),this.off("no"),this.off("ok"),this.off("cancel"),this.off("modal.hide"),this.off("modal.close"),this.off("modal.before.hide")}});b.exports=e},{"./template/responsive.html":7}],7:[function(a,b,c){b.exports='<div id="<%- id %>" class="modal responsive fade" tabindex="-1" aria-hidden="true" data-backdrop="static">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <% if(buttons.length<2) { %>\n                <button type="button" class="close" data-dismiss="modal"\n                        aria-hidden="true"></button>\n                \n                <% } %>\n                <h4 class="modal-title"><%- title %></h4>\n            </div>\n            <div class="modal-body">\n                <div class="scroller" style="height:200px" data-always-visible="1" data-rail-visible1="1">\n                    <div class="row">\n                        <div class="col-md-12">\n                            <%= message %>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <% _.each(buttons, function(button) { %>\n                    <% if(button=="yes"){%>\n                             <button type="button" class="btn green" id="button-yes"\n                                     style="padding-left: 20px;padding-right: 20px;">Si\n                             </button>\n                    <% }%>\n                    <% if(button=="no"){%>\n                             <button type="button" class="btn blue" id="button-no"\n                                     style="padding-left: 20px;padding-right: 20px;">No</button>\n                    <% }%>\n                    <% if(button=="ok"){%>\n                             <button type="button" class="btn green" id="button-ok"\n                                     style="padding-left: 20px;padding-right: 20px;">Ok</button>\n                    <% }%>\n                    <% if(button=="cancel"){%>\n                             <button type="button" class="btn green" id="button-cancel">Cancel</button>\n                    <% }%>\n                    <% if(button=="chiudi"){%>\n                <button type="button" data-dismiss="modal" class="btn dark btn-outline">Chiudi</button>\n                    <% }%>\n                \n                <% }) %>\n            </div>\n        </div>\n    </div>\n</div>\n'},{}],8:[function(a,b,c){(function(b){"use strict";!function(a){var d="object"==typeof self&&self.self===self&&self||"object"==typeof b&&b.global===b&&b;"function"==typeof define&&define.amd?define(["exports"],function(b){d.BbTools=a(d,b)}):void 0!==c?a(d,c):d.BbTools=a(d,{})}(function(b,c){var c={};return c.Debug=a("./Debug"),c.Collection=a("./Collection/Collection"),c.Model=a("./Model/Model"),c.ApigilityModel=a("./Model/ApigilityModel"),c.EnvironmentModel=a("./Model/EnvinonmentModel"),c.View={},c.View.Modal={},c.View.Modal.Responsive=a("./View/Modal/Responsive"),c.init=function(){},b.BbTools=c,c})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Collection/Collection":1,"./Debug":2,"./Model/ApigilityModel":3,"./Model/EnvinonmentModel":4,"./Model/Model":5,"./View/Modal/Responsive":6}]},{},[8]);