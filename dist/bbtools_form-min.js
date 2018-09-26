!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d;d=Backbone.View.extend({events:{"change .data-editor":"onChange","keyup .data-editor":"onKeyUp","blur .data-editor":"onBlur","focus .data-editor":"onFocus"},attributes:{},view_attributes:{},input_attributes:{},initialize:function(a){if(!a.model)throw new Error("option obbligatoria non definita: 'model'");"function"==typeof a.onEvent&&(this.onEvent=a.onEvent),"function"==typeof a.onChange&&(this.onChange=a.onChange),"function"==typeof a.onKeyUp&&(this.onKeyUp=a.onKeyUp),this.view_attributes=void 0!==a.view_attributes?a.view_attributes:this.view_attributes,this.input_attributes=void 0!==a.input_attributes?a.input_attributes:this.input_attributes,this.bind("editor.value.invalid",this.onValueInvalid),void 0!==a.key&&(this.key=a.key,this.model.bind("change:"+this.key,this.onModelChange,this)),this.name=void 0!==a.name?a.name:this.key,this.listenTo(this.model,"error",this.onModelError,this)},render:function(a){return this.trigger("editor.render",{editor:this}),this},onEvent:function(a){this.trigger("editor.event",this)},onBlur:function(a){this.trigger("editor.blur",this)},onFocus:function(a){this.trigger("editor.focus",this)},onValueInvalid:function(a){BbTools.Debug.log(a,"evento editor.value.invalid intercettato ")},onModelError:function(a,b){if(422==b.status&&_.has(b.responseJSON.validation_messages,this.key)){var c=_.propertyOf(b.responseJSON.validation_messages)(this.key);this.trigger("editor.model.error",{messages:c})}},onModelChange:function(a,b,c){this.setValue(b)},getValue:function(){return this.value},setValue:function(a){this.value=a,this.trigger("editor.set.value",{editor:this,value:a})},onChange:function(a){var b=a.currentTarget.value;b=this.filter(b),this.model.set(this.key,b),this.trigger("editor.change",a)},onKeyUp:function(a){this.trigger("editor.keyup",a)},validate:function(){return BbTools.Debug.log("metodo validate non implementato"),!0},filter:function(a){return a},resetStatusClass:function(){this.$el.removeClass("has-error"),this.$el.removeClass("has-success"),this.$el.removeClass("has-warning"),this.$el.find(".help-block.data-error").empty()},resetDataError:function(){this.$el.find(".help-block.data-error").empty()}}),b.exports=d},{}],2:[function(a,b,c){"use strict";var d=a("./ButtonEditorView"),e=d.extend({label:"salva",initialize:function(a){d.prototype.initialize.call(this,a),this.$el.addClass("commit"),this.bind("model.commit.success",this.onModelCommitSuccess,this),this.bind("editor.event",this.onEditorEvent,this)},onEditorEvent:function(a){this.commit()},commit:function(){this.validate();var a=this;a.trigger("model.commit",{this:a});var b={success:function(b){a.trigger("model.commit.success",{this:a,data:b}),a.model.trigger("model.commit.success",{this:a,data:b})},error:function(b){a.trigger("model.commit.error",{this:a,e:b})}};this.model.save(null,b)},onModelCommitSuccess:function(a){}});b.exports=e},{"./ButtonEditorView":3}],3:[function(a,b,c){"use strict";var d=a("../FormFieldEditorView"),e=d.extend({tagName:"button",events:{"click ":"onEvent"},label:"label",initialize:function(a){d.prototype.initialize.call(this,a),void 0!==a.label&&(this.label=a.label),this.attributes=void 0!==a.attributes?a.attributes:this.attributes,this.bind("editor.render",this.onEditorRender,this),this.render(this.cid)},onEditorRender:function(a){var b={name:this.name,key:this.key,title:this.title,label:this.label,help:this.help,editorId:this.name+this.model.cid,attributes:this.view_attributes};this.$el.attr(this.attributes),this.$el.addClass("editor"),this.$el.html(b.label),this.setValue(this.model.get(this.key))}});b.exports=e},{"../FormFieldEditorView":1}],4:[function(a,b,c){"use strict";var d=a("./TextEditorView"),e=d.extend({initialize:function(a){void 0!==a.write_pattern?this.write_pattern=a.write_pattern:this.write_pattern=/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,void 0!==a.write_replace?this.write_replace=a.write_replace:this.write_replace="$3-$2-$1",void 0!==a.read_pattern?this.read_pattern=a.read_pattern:this.read_pattern=/^(\d{4})-(\d{1,2})-(\d{1,2})$/,void 0!==a.read_replace?this.read_replace=a.read_replace:this.read_replace="$3/$2/$1",d.prototype.initialize.call(this,a)}});b.exports=e},{"./TextEditorView":8}],5:[function(a,b,c){"use strict";var d=a("../../FormFieldEditorView"),e=d.extend({tagName:"div",template:_.template('      <label class="<%= attributes.label_class %> control-label" for="<%= editorId %>"><%= title %></label>      <div class="<%= attributes.field_class %>">        <div class="<%= attributes.form_control_class %> form-control data-editor " id="<%= editorId %>" readonly></div>        <p class="<%= attributes.data_error_class %> help-block data-error"></p>        <p class="<%= attributes.help_block_class %>help-block"><%= help %></p>      </div>    '),view_attributes:{label_class:"col-md-3",field_class:"col-md-9",form_control_class:"",data_error_class:"",help_block_class:""},initialize:function(a){if(d.prototype.initialize.call(this,a),void 0===a.key)throw new Error("editor bootstrap/InputTextEditorView option obbligatoria non definita: 'key' equivalente all'attrib nel model");this.key=a.key,this.title=void 0!==a.title?a.title:this.key,this.help=void 0!==a.help?a.help:"",this.initAttributes(a),this.bind("editor.set.value",this.onEditorSetValue,this),this.bind("editor.render",this.onEditorRender,this),this.bind("editor.model.error",this.onEditorModelError,this),this.model.bind("model.commit.success",this.onEditorModelSuccess,this),this.render(this.cid)},initAttributes:function(a){this.attributes=void 0!==a.attributes?a.attributes:this.attributes,_.has(this.attributes,"class")?/(form-group)/.test(this.attributes.class)||(this.attributes.class="form-group "+this.attributes.class):_.extend(this.attributes,{class:"form-group"}),_.extend(this.attributes,{"data-field":this.key})},onEditorModelError:function(a){this.resetStatusClass(),this.resetDataError(),_.mapObject(a.messages,function(a,b){var c=document.createElement("div"),d=document.createTextNode(a);c.appendChild(d),this.$el.find(".help-block.data-error").append(c)},this)},onEditorModelSuccess:function(a){this.resetStatusClass(),this.resetDataError(),this.$el.addClass("has-success")},onEditorRender:function(a){this.$el.empty();var b={name:this.name,key:this.key,title:this.title,help:this.help,editorId:this.name+this.model.cid,attributes:this.view_attributes};this.$el.attr(this.attributes),this.$el.html(this.template(b)),this.setValue(this.model.get(this.key))},onEditorSetValue:function(a){this.resetStatusClass(),this.resetDataError(),this.$el.find(".help-block.data-error").empty(),this.writeValue(a.value)},onEvent:function(a){this.trigger("editor.event",this),this.trigger("editor.text.event",this)}});b.exports=e},{"../../FormFieldEditorView":1}],6:[function(a,b,c){"use strict";var d=a("../../FormFieldEditorView"),e=a("./template/SelectEditorTemplate.html"),f=d.extend({tagName:"div",template:_.template(e),options:[],label:"label",initialize:function(a){if(d.prototype.initialize.call(this,a),void 0===a.key)throw new Error("editor bootstrap/SelectEditorView option obbligatoria non definita: 'key' equivalente all'attrib nel model");this.key=a.key,void 0!==a.readonly&&!0===a.readonly&&(this.readonly=!0),this.name=void 0!==a.name?a.name:this.key,this.title=void 0!==a.title?a.title:this.key,void 0!==a.label&&(this.label=a.label),this.initAttributes(a),this.bind("editor.render",this.onEditorRender,this),this.bind("editor.event",this.onEditorEvent,this),this.bind("editor.model.error",this.onEditorModelError,this),this.bind("editor.set.value",this.onEditorSetValue,this),this.model.bind("model.commit.success",this.onEditorModelSuccess,this),this.setSelectOptions(a)},initAttributes:function(a){this.attributes=void 0!==a.attributes?a.attributes:this.attributes,_.has(this.attributes,"class")?/(form-group)/.test(this.attributes.class)||(this.attributes.class="form-group "+this.attributes.class):_.extend(this.attributes,{class:"form-group"}),_.extend(this.attributes,{"data-field":this.key})},setSelectOptions:function(a){void 0!==a.options&&(this.options=[],this.options.push({value:"",option:"---"}),_.each(a.options,function(a){"string"==typeof a?this.options.push({value:a,option:a}):"object"==typeof a&&this.options.push({value:a.value,option:a.option})},this),this.render(this.cid))},onEditorRender:function(a){var b={name:this.name,key:this.key,title:this.title,label:this.label,help:this.help,editorId:this.name+this.model.cid,attributes:this.view_attributes,options:this.options,disabled:this.readonly?"disabled ":""};this.$el.attr(this.attributes),this.$el.html(this.template(b)),this.setValue(this.model.get(this.key))},onEditorSetValue:function(a){this.resetStatusClass(),this.resetDataError(),this.$el.find("option[value='"+a.value+"']").attr("selected","selected")},onEditorModelError:function(a){this.$el.addClass("has-error"),this.$el.removeClass("has-warning"),_.mapObject(a.messages,function(a,b){var c=document.createElement("div"),d=document.createTextNode(a);c.appendChild(d),this.$(".help-block.data-error").append(c)},this)},onEditorModelSuccess:function(a){this.resetStatusClass(),this.resetDataError(),this.$el.addClass("has-success")}});b.exports=f},{"../../FormFieldEditorView":1,"./template/SelectEditorTemplate.html":10}],7:[function(a,b,c){"use strict";var d,e=a("../../FormFieldEditorView"),f=a("./template/SelectEditorTemplate.html");d=e.extend({tagName:"div",template:_.template(f),options:[],label:"label",initialize:function(a){if(e.prototype.initialize.call(this,a),void 0===a.key)throw new Error("editor bootstrap/SelectModelEditorView option obbligatoria non definita: 'key' equivalente all'attrib nel model");if(this.key=a.key,this.name=void 0!==a.name?a.name:this.key,this.title=void 0!==a.title?a.title:this.key,void 0!==a.label&&(this.label=a.label),this.initAttributes(a),this.key_value=a.key_value,this.key_option=a.key_option,this.bind("editor.render",this.onEditorRender,this),this.bind("editor.event",this.onEditorEvent,this),this.bind("editor.model.error",this.onEditorModelError,this),this.bind("editor.set.value",this.onEditorSetValue,this),this.model.bind("model.commit.success",this.onEditorModelSuccess,this),_.isObject(this.collection)){var b=void 0!==a.fetch_data?a.fetch_data:{};this.setCollection({data:b})}else this.setSelectOptions()},initAttributes:function(a){this.attributes=void 0!==a.attributes?a.attributes:this.attributes,_.has(this.attributes,"class")?/(form-group)/.test(this.attributes.class)||(this.attributes.class="form-group "+this.attributes.class):_.extend(this.attributes,{class:"form-group"}),_.extend(this.attributes,{"data-field":this.key})},setSelectOptions:function(a){this.options=[],this.options.push({value:"",option:"---"}),_.isObject(this.collection)&&_.each(this.collection.models,function(a){var b=a.get(this.key_value);if("string"==typeof this.key_option)var c=a.get(this.key_option);else if("object"==typeof this.key_option)var c=this.key_option.reduce(function(b,c){return a.get(b)+" "+a.get(c)});else if("function"==typeof this.key_option)var c=this.key_option(a);this.options.push({value:b,option:c})},this),this.render(this.cid)},onEditorRender:function(a){var b={name:this.name,key:this.key,title:this.title,label:this.label,help:this.help,editorId:this.name+this.model.cid,attributes:this.view_attributes,options:this.options,disabled:this.readonly?"disabled ":""};this.$el.attr(this.attributes),this.$el.html(this.template(b)),this.setValue(this.model.get(this.key))},onEditorSetValue:function(a){this.resetStatusClass(),this.resetDataError(),this.$el.find("option[value='"+a.value+"']").attr("selected","selected")},onEditorModelError:function(a){this.resetStatusClass(),this.resetDataError(),this.$el.addClass("has-error"),_.mapObject(a.messages,function(a,b){var c=document.createElement("div"),d=document.createTextNode(a);c.appendChild(d),this.$(".help-block.data-error").append(c)},this)},onEditorModelSuccess:function(a){this.resetStatusClass(),this.resetDataError(),this.$el.addClass("has-success")},setCollection:function(a){_.isObject(this.collection)&&this.collection.off(),_.isObject(a.collection)&&(this.collection=a.collection),_.isObject(this.collection)&&(this.collection.bind("sync",this.setSelectOptions,this),this.collection.fetch(a.data))}}),b.exports=d},{"../../FormFieldEditorView":1,"./template/SelectEditorTemplate.html":10}],8:[function(a,b,c){"use strict";var d=a("./template/TextEditorTemplate.html"),e=a("./template/ReadOnlyTextEditorTemplate.html"),f=a("../../FormFieldEditorView"),g=f.extend({tagName:"div",template:_.template(d),view_attributes:{label_class:"col-md-3",field_class:"col-md-9",form_control_class:"",data_error_class:"",help_block_class:""},initialize:function(a){if(f.prototype.initialize.call(this,a),void 0===a.key)throw new Error("editor bootstrap/InputTextEditorView option obbligatoria non definita: 'key' equivalente all'attrib nel model");this.key=a.key,void 0!==a.readonly&&!0===a.readonly&&(this.readonly=!0,this.template=_.template(e)),void 0!==a.write_pattern?this.write_pattern=a.write_pattern:this.write_pattern=/^(.+)$/,void 0!==a.write_replace?this.write_replace=a.write_replace:this.write_replace="$1",void 0!==a.read_pattern?this.read_pattern=a.read_pattern:this.read_pattern=/^(.+)$/,void 0!==a.read_replace?this.read_replace=a.read_replace:this.read_replace="$1",this.title=void 0!==a.title?a.title:this.key,this.help=void 0!==a.help?a.help:"",this.initAttributes(a),this.bind("editor.set.value",this.onEditorSetValue,this),this.bind("editor.render",this.onEditorRender,this),this.bind("editor.model.error",this.onEditorModelError,this),this.model.bind("model.commit.success",this.onEditorModelSuccess,this),this.render(this.cid)},initAttributes:function(a){this.attributes=void 0!==a.attributes?a.attributes:this.attributes,_.has(this.attributes,"class")?/(form-group)/.test(this.attributes.class)||(this.attributes.class="form-group "+this.attributes.class):_.extend(this.attributes,{class:"form-group"}),_.extend(this.attributes,{"data-field":this.key})},onEditorModelError:function(a){this.$el.addClass("has-error"),this.$el.find(".help-block.data-error").empty(),_.mapObject(a.messages,function(a,b){var c=document.createElement("div"),d=document.createTextNode(a);c.appendChild(d),this.$el.find(".help-block.data-error").append(c)},this)},onEditorModelSuccess:function(a){this.resetStatusClass(),this.resetDataError(),this.$el.addClass("has-success")},onEditorRender:function(a){this.$el.empty();var b={name:this.name,key:this.key,title:this.title,help:this.help,editorId:this.name+this.model.cid,attributes:this.view_attributes,input_attributes:this.input_attributes};this.$el.attr(this.attributes),this.$el.html(this.template(b)),this.setValue(this.model.get(this.key))},writeValue:function(a){this.readonly?this.$(".data-editor").text(a):this.$(".data-editor").val(a)},focus:function(){this.$(".data-editor").focus(),this.trigger("editor.focus",this)},onEditorSetValue:function(a){this.resetStatusClass(),this.resetDataError();var b=this.filterForRead(a.value);this.writeValue(b)},onEvent:function(a){this.trigger("editor.event",this),this.trigger("editor.text.event",this)},filter:function(a){return this.filterForWrite(a)},filterForWrite:function(a){var b=this.write_pattern;if(_.isString(a)&&!_.isEmpty(a)&&b.test(a)){return a.replace(b,this.write_replace)}return a},filterForRead:function(a){var b=this.read_pattern;if(_.isString(a)&&!_.isEmpty(a)&&b.test(a)){return a.replace(b,this.read_replace)}return a}});b.exports=g},{"../../FormFieldEditorView":1,"./template/ReadOnlyTextEditorTemplate.html":9,"./template/TextEditorTemplate.html":11}],9:[function(a,b,c){b.exports='<label class="<%= attributes.label_class %> control-label" for="<%= editorId %>"><%= title %></label>\n<div class="<%= attributes.field_class %>">\n    <div class="<%= attributes.form_control_class %> form-control data-editor" id="<%= editorId %>" readonly></div>\n    <p class="<%= attributes.data_error_class %> help-block data-error"></p>\n    <p class="<%= attributes.help_block_class %>help-block"><%= help %></p>\n</div>\n'},{}],10:[function(a,b,c){b.exports='<label class="<%= attributes.label_class %> control-label" for="<%= editorId %>"><%= title %></label>\n<div class="<%= attributes.field_class %>">\n    <select class="<%= attributes.form_control_class %> form-control data-editor"\n            id="<%= editorId %>" <%=disabled%> >\n                                 <% for(i=0;i < options.length;i++){%>\n                                 <% var option=options[i];%>\n    <option value="<%= option.value %>"><%= option.option %></option>\n                                 <% }%>\n    </select>\n    <p class="<%= attributes.data_error_class %> help-block data-error"></p>\n    <p class="<%= attributes.help_block_class %>help-block"><%= help %></p>\n</div>'},{}],11:[function(a,b,c){b.exports='    <% var input_attributes_string = _.reduce(_.pairs(input_attributes), function(result, val){\n            return result+val[0]+\': \\"\'+ val[1]+\'\\" \';\n    },\'\') %>\n<label class="<%= attributes.label_class %> control-label" for="<%= editorId %>"><%= title %></label>\n<div class="<%= attributes.field_class %>">\n    <input class="<%= attributes.form_control_class %> form-control data-editor" id="<%= editorId %>"\n    <%= input_attributes_string %>   >\n    <p class="<%= attributes.data_error_class %> help-block data-error"></p>\n    <p class="<%= attributes.help_block_class %>help-block"><%= help %></p>\n</div>\n'},{}],12:[function(a,b,c){"use strict";var d=Backbone.Router.extend({initialize:function(a){Backbone.Router.prototype.initialize.apply(this,[a]),this.model=a.model,void 0!==a.formView&&(this.formView=a.formView),void 0!==a.formTitle&&(this.formTitle=a.formTitle),_.each(Backbone.$("a.form-cancel"),function(a){Backbone.$(a).bind("click",{this:this},this.onFormCancel)},this),this.model.on("sync",this.onModelSync,this),this.model.on("request",this.onRequest,this),this.bind("cancel",this.onFormCancel,this),this.listenTo(this.model,"error",this.onModelError,this)},onFormCancel:function(a){},onRequest:function(a,b,c){b.then(function(){App.unblockUI()}),App.blockUI()},onModelSync:function(a){Backbone.$("ul.page-breadcrumb > li > a.active").html(this.formTitle()),Backbone.$("ul.page-breadcrumb > li > a.active").attr("href",window.location.href),Backbone.$("ul.page-breadcrumb > li > a.breadcrumb-grid").attr("href","javascript:history.back()")},formTitle:function(a){},onModelError:function(a,b,c){if(422==b.status)var d="<h4>Entità non processabile</h4>";else var d="<h4>"+b.responseJSON.title+"</h4>";d=d+"<h5>"+b.responseJSON.detail+"</h5>";var e={buttons:["ok"],message:d};App.unblockUI(),new BbTools.View.Modal.Responsive(e).show()}});b.exports=d},{}],13:[function(a,b,c){(function(b){"use strict";!function(a){var d="object"==typeof self&&self.self===self&&self||"object"==typeof b&&b.global===b&&b;"function"==typeof define&&define.amd?define(["exports"],function(b){d.BbToolsForm=a(d,b)}):void 0!==c?a(d,c):d.BbToolsForm=a(d,{})}(function(b,c){var c={};return c.editors={},c.editors.TextEditorView=a("./Form/editors/bootstrap/TextEditorView"),c.editors.DateTextEditorView=a("./Form/editors/bootstrap/DateTextEditorView"),c.editors.SelectEditorView=a("./Form/editors/bootstrap/SelectEditorView"),c.editors.SelectModelEditorView=a("./Form/editors/bootstrap/SelectModelEditorView"),c.editors.ReadOnlyEditorView=a("./Form/editors/bootstrap/ReadOnlyEditorView"),c.editors.ButtonEditorView=a("./Form/editors/ButtonEditorView"),c.editors.ButtonCommitEditorView=a("./Form/editors/ButtonCommitEditorView"),c.Router=a("./Router/CrudFormRouter"),c.init=function(){},b.BbToolsForm=c,c})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Form/editors/ButtonCommitEditorView":2,"./Form/editors/ButtonEditorView":3,"./Form/editors/bootstrap/DateTextEditorView":4,"./Form/editors/bootstrap/ReadOnlyEditorView":5,"./Form/editors/bootstrap/SelectEditorView":6,"./Form/editors/bootstrap/SelectModelEditorView":7,"./Form/editors/bootstrap/TextEditorView":8,"./Router/CrudFormRouter":12}]},{},[13]);