!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d;d=Backbone.Router.extend({page:null,query:null,search_into:null,filters:null,order:null,order_direction:null,initialize:function(a){Backbone.Router.prototype.initialize.apply(this,[a]),this.collection=a.collection,this.gridView=a.gridView,this.gridView.bind("sort",this.onSort,this),void 0!==a.searchView&&(this.searchView=a.searchView),void 0!==a.pageNavigator&&(this.pageNavigator=a.pageNavigator),"object"==typeof a.filters&&(this.filters=a.filters),void 0!==a.searchView&&this.searchView.bind("search",this.onSearch,this),void 0!==a.pageNavigator&&this.pageNavigator.bind("go",this.onPage,this),"object"==typeof a.filters&&this.filters.bind("sync",this.onFilter,this),this.collection.on("request",this.onRequest,this),this.collection.on("error",this.onModelError,this)},routes:{":mode/(:page)(/:second_a)(/:second_b)(/:third_a)(/:third_b)(/:fourth_a)(/:fourth_b)":"goMode"},onRequest:function(a,b,c){b.success(function(){App.unblockUI()}),App.blockUI()},onModelError:function(a,b,c){if(422==b.status&&_.has(b.responseJSON.validation_messages,this.key)){var d=_.propertyOf(b.responseJSON.validation_messages)(this.key);this.trigger("editor.model.error",{messages:d})}App.unblockUI();var e="<h4>"+b.statusText+"</h4>";e=e+"<h5>"+b.responseText+"</h5>";var f={buttons:["ok"],message:e};new BbTools.View.Modal.Responsive(f).show()},onSort:function(a){this.order=a.order,this.order_direction=a.order_direction;var b=this.composeRoute();this.navigate(b,{replace:!0}),this.goFetch()},onSearch:function(a){this.query=a.search,this.search_into=a.search_into,this.page=null;var b=this.composeRoute();this.navigate(b,{replace:!0}),this.goFetch()},onFilter:function(a){var b=this.composeRoute();this.navigate(b,{replace:!0}),this.goFetch()},onPage:function(a){this.page=a.page;var b=this.composeRoute();this.navigate(b,{replace:!0}),this.goFetch()},goMode:function(a,b,c,d,e,f,g,h){this.reset();var i=a.split("");i.shift();_.isNull(b)&&(b=1),this.page=b;var j=function(a,b,c,d){if(!_.isNull(b)&&!_.isNull(c))if("o"===a)d.order=b,d.order_direction=c,d.gridView.defaultOrder(d.order,d.order_direction);else if("s"===a)d.query=b,d.search_into=c,d.searchView.default(d.query);else if("f"===a){_.isString(b)&&(b=b.split(",")),_.isString(c)&&(c=c.split(","));var e=_.object(b,c);_.each(e,function(a,b,c){d.filters.set(b,a)})}},k=i.shift();void 0!==k&&j(k,c,d,this);var l=i.shift();void 0!==l&&j(l,e,f,this);var m=i.shift();void 0!==m&&j(m,g,h,this),this.goFetch()},goFetch:function(){var a={};_.isNull(this.page)||(a.page=this.page),_.isNull(this.query)||(a.search=this.query),_.isNull(this.query)||(a.search_into=this.search_into),_.isString(a.search_into)&&(a.search_into=a.search_into.split(",")),_.isNull(this.order)||(a.order=this.order),_.isNull(this.order)||(a.order_direction=this.order_direction),_.isNull(this.filters)||(a.filters_keys=_.keys(this.filters.attributes)),_.isString(a.filters_keys)&&(a.filters_keys=a.filters_keys.split(",")),_.isNull(this.filters)||(a.filters_values=_.values(this.filters.attributes)),_.isString(a.filters_values)&&(a.filters_values=a.filters_values.split(","));var b=this,c={error:function(c){a.page=b.page=1,b.navigate(b.composeRoute()),b.collection.goFetch({data:a})}};a!={}&&(c.data=a),this.collection.goFetch(c)},reset:function(){this.page=null,this.order=null,this.order_direction=null,this.query=null,this.search_into=null},composeRoute:function(){var a="",b="p";return(_.isNull(this.page)||_.isUndefined(this.page))&&(this.page=1),a+=this.page,_.isNull(this.order)||_.isUndefined(this.order)||(b+="o",a+="/"+this.order,a+="/"+this.order_direction),_.isNull(this.query)||_.isUndefined(this.query)||(b+="s",a+="/"+this.query,a+="/"+this.search_into),_.isNull(this.filters)||_.isUndefined(this.filters)||(b+="f",a+="/"+_.keys(this.filters.attributes),a+="/"+_.values(this.filters.attributes)),b+"/"+a}}),b.exports=d},{}],2:[function(a,b,c){"use strict";var d=Backbone.View.extend({tagName:"label",events:{"change input ":"change","click ":"click"},template:_.template('<input type="checkbox" name="<%- name %>" value="<%- row_id %>"/> <span></span>'),initialize:function(a){void 0!==a.value&&(this.value=a.value)},render:function(){return this.$el.empty(),void 0===this.attributes&&(this.attributes={}),this.attributes=_.extend(this.attributes,{"data-model-id":this.model.id}),this.$el.attr(this.attributes),this.$el.append(this.template({row_id:this.model.id,name:this.attributes.name})),this.delegateEvents(),this},change:function(a){this.trigger("cell.change",{id:a.currentTarget.value,name:a.currentTarget.name,checked:a.currentTarget.checked,model:this.model})},click:function(a){a.stopPropagation()}});b.exports=d},{}],3:[function(a,b,c){"use strict";var d=Backbone.View.extend({tagName:"td",events:{"click ":"clickCell"},initialize:function(a){void 0!==a.value&&(this.value=a.value,this.value.bind("selected",function(a){this.trigger("selected",a)},this),this.value.bind("cell.change",function(a){this.trigger("cell.change",a)},this))},render:function(){return this.$el.empty(),void 0===this.attributes&&(this.attributes={}),this.attributes=_.extend(this.attributes,{"data-model-id":this.model.get("id")}),this.$el.attr(this.attributes),this.$el.append(this.value.render().el),this.delegateEvents(),this},clickCell:function(a){this.trigger("cell.click",a)}});b.exports=d},{}],4:[function(a,b,c){"use strict";var d=Backbone.View.extend({tagName:"td",events:{"click ":"clickCell"},initialize:function(a){void 0!==a.value&&(this.value=a.value),_.isFunction(a.formatValue)&&(this.formatValue=a.formatValue)},render:function(){this.$el.empty(),void 0===this.attributes&&(this.attributes={}),this.attributes=_.extend(this.attributes,{"data-model-id":this.model.get("id")}),this.$el.attr(this.attributes);var a=this.formatValue(this.model.get(this.value));return this.$el.append(a),this.delegateEvents(),this},formatValue:function(a){return a},clickCell:function(a){this.trigger("cell.click",a)}});b.exports=d},{}],5:[function(require,module,exports){"use strict";var BodyCellStringView=require("./BodyCellStringView"),BodyCellComponentView=require("./BodyCellComponentView"),BodyRowView=Backbone.View.extend({tagName:"tr",events:{"click ":"clickRow"},initialize:function(a){"undeifned"!=typeof a.columns&&(this.columns=a.columns),void 0!==a.CellView?this.CellView=a.CellView:this.CellView=BodyCellStringView,this.model.bind("change",this.initCells,this),this.initCells()},initCells:function(e){_.each(this.cells,function(a){a.remove()},this),this.cells=[],_.mapObject(this.columns,function(value,key){if(value.prototype instanceof Backbone.View)var cellValue=new value({}),cell=new BodyCellComponentView({model:this.model,value:cellValue});else if(value instanceof Backbone.View)var cell=value;else if("object"==typeof value){value.options.model=this.model;var attributes=void 0!==value.attributes?value.attributes:{},valuecell=eval("new "+value.view+"(value.options)"),cell=new BodyCellComponentView({model:this.model,value:valuecell,attributes:attributes})}else if("string"==typeof value)var cell=new this.CellView({model:this.model,value:key,label:value});else BbTools.Debug.log(value,"tipo non supportato");void 0!==cell&&(this.listenTo(cell,"cell.change",this.onCellChange),this.cells.push(cell))},this),this.render()},render:function(){return this.$el.empty(),void 0===this.attributes&&(this.attributes={}),this.attributes=_.extend(this.attributes,{"data-model-id":this.model.get("id")}),this.$el.attr(this.attributes),_.each(this.cells,function(a){this.$el.append(a.render().el)},this),this.delegateEvents(),this},selectRow:function(a){this.$el.addClass("selected"),this.model.trigger("select",{id:this.model.getIdentifier()})},unSelectRow:function(a){this.$el.removeClass("selected"),this.model.trigger("unselect",{id:this.model.getIdentifier()})},clickRow:function(a){},onCellChange:function(a){"select_row"==a.name&&(1==a.checked?this.selectRow(a.id):0==a.checked&&this.unSelectRow(a.id))}});module.exports=BodyRowView},{"./BodyCellComponentView":3,"./BodyCellStringView":4}],6:[function(a,b,c){"use strict";var d=a("./BodyRowView"),e=Backbone.View.extend({tagName:"tbody",rows:[],initialize:function(a){"undeifned"!=typeof a.columns&&(this.columns=a.columns),void 0!==a.RowView?this.RowView=a.RowView:this.RowView=d,this.collection.bind("sync",this.initRows,this)},initRows:function(a){_.each(this.rows,function(a){a.remove()},this),this.rows=[],_.each(this.collection.models,function(a){var b=new this.RowView({model:a,columns:this.columns});this.listenTo(b,"click",this.onClickRow),this.rows.push(b)},this),this.render()},render:function(){return this.$el.empty(),void 0!==this.attributes&&this.$el.attr(this.attributes),_.each(this.rows,function(a){this.$el.append(a.render().el)},this),this.delegateEvents(),this},onClickRow:function(a){}});b.exports=e},{"./BodyRowView":5}],7:[function(a,b,c){"use strict";var d={};d.TableView=a("./TableView"),d.HeadView=a("./HeadView"),d.HeadRowView=a("./HeadRowView"),d.HeadCellView=a("./HeadCellStringView"),d.BodyView=a("./BodyView"),d.BodyRowView=a("./BodyRowView"),d.BodyCellStringView=a("./BodyCellStringView"),d.BodyCellCheckboxView=a("./BodyCellCheckboxView"),b.exports=d},{"./BodyCellCheckboxView":2,"./BodyCellStringView":4,"./BodyRowView":5,"./BodyView":6,"./HeadCellStringView":9,"./HeadRowView":10,"./HeadView":11,"./TableView":12}],8:[function(a,b,c){"use strict";var d=Backbone.View.extend({tagName:"th",events:{"click ":"clickCell"},initialize:function(a){void 0!==a.value&&(this.value=a.value),void 0!==a.sortable&&(this.sortable=a.sortable),"id"==this.value?this.tagName="th":this.tagName="td",this.el=null,this._ensureElement()},render:function(){return this.$el.empty(),void 0===this.attributes&&(this.attributes={}),this.$el.attr(this.attributes),this.$el.append(this.value.render().el),this.delegateEvents(),this},clickCell:function(a){this.trigger("cell.click",a)}});b.exports=d},{}],9:[function(a,b,c){"use strict";var d=a("./template/head_cell.html"),e=Backbone.View.extend({tagName:"th",events:{"click .sortable.both":"sortBoth","click .sortable.desc":"sortAsc","click .sortable.asc":"sortDesc"},initialize:function(a){void 0!==a.value&&(this.value=a.value),void 0!==a.label?this.label=a.label:this.label=this.value.replace("_"," "),this.template=_.template(d)},render:function(){return this.$el.empty(),void 0===this.attributes&&(this.attributes={}),this.attributes=_.extend(this.attributes,{"data-field":this.value}),this.$el.attr(this.attributes),this.$el.append(this.template({value:this.value,label:this.label})),""==this.value&&(this.$(".sortable").removeClass("sortable"),this.$(".both").removeClass("both")),this.delegateEvents(),this},sortBoth:function(a){this.trigger("sort",{order:a.currentTarget.dataset.field,order_direction:"asc"}),Backbone.$(a.currentTarget).removeClass("both"),Backbone.$(a.currentTarget).addClass("asc")},sortAsc:function(a){this.trigger("sort",{order:a.currentTarget.dataset.field,order_direction:"asc"}),Backbone.$(a.currentTarget).removeClass("both"),Backbone.$(a.currentTarget).removeClass("desc"),Backbone.$(a.currentTarget).addClass("asc")},sortDesc:function(a){this.trigger("sort",{order:a.currentTarget.dataset.field,order_direction:"desc"}),Backbone.$(a.currentTarget).removeClass("both"),Backbone.$(a.currentTarget).removeClass("asc"),Backbone.$(a.currentTarget).addClass("desc")},resetOrder:function(){Backbone.$("div.sortable").removeClass("asc"),Backbone.$("div.sortable").removeClass("desc"),Backbone.$("div.sortable").addClass("both")}});b.exports=e},{"./template/head_cell.html":13}],10:[function(require,module,exports){"use strict";var HeadCellStringView=require("./HeadCellStringView"),HeadCellComponentView=require("./HeadCellComponentView"),HeadRowView=Backbone.View.extend({tagName:"tr",events:{"click ":"clickHeadRow"},initialize:function(a){void 0!==a.columns&&(this.columns=a.columns),void 0!==a.CellView?this.CellView=a.CellView:this.CellView=HeadCellStringView,this.initCells()},initCells:function(e){_.each(this.cells,function(a){a.remove()},this),this.cells=[],_.mapObject(this.columns,function(value,key){if(value.prototype instanceof Backbone.View)var cell=new value({});else if(value instanceof Backbone.View)var cell=new HeadCellComponentView({model:this.model,value:value});else if("object"==typeof value){if(1==value.renderInHead)var cellView=eval("new "+value.view+"(value.options)"),cell=new HeadCellComponentView({model:this.model,value:cellView});else var label=void 0!==value.options.label?value.options.label:"",cell=new HeadCellStringView({model:this.model,value:key,label:label,sortable:!1});cell.bind("sort",this.onSort,this)}else if("string"==typeof value){var cell=new this.CellView({model:this.model,value:key,label:value});cell.bind("sort",this.onSort,this)}else BbTools.Debug.log(value,"tipo non supportato");void 0!==cell&&this.cells.push(cell)},this),this.render()},render:function(){return this.$el.empty(),void 0===this.attributes&&(this.attributes={}),this.$el.attr(this.attributes),_.each(this.cells,function(a){this.$el.append(a.render().el)},this),this.delegateEvents(),this},onSort:function(a){this.resetOrder(),this.trigger("sort",{order:a.order,order_direction:a.order_direction})},resetOrder:function(){_.each(this.cells,function(a){"string"==typeof a.value&&a.resetOrder()})},defaultOrder:function(a,b){Backbone.$("th[data-field="+a+"] > div.sortable").removeClass("both"),Backbone.$("th[data-field="+a+"] > div.sortable").addClass(b)},clickHeadRow:function(a){}});module.exports=HeadRowView},{"./HeadCellComponentView":8,"./HeadCellStringView":9}],11:[function(a,b,c){"use strict";var d=a("./HeadRowView"),e=Backbone.View.extend({tagName:"thead",rows:[],initialize:function(a){void 0!==a.columns&&(this.columns=a.columns),void 0!==a.RowView?this.RowView=a.RowView:this.RowView=d,this.initRows()},initRows:function(a){_.each(this.rows,function(a){a.remove()},this),this.rows=[];var b=new this.RowView({columns:this.columns});this.listenTo(b,"row.click",this.onClickHeadRow),this.listenTo(b,"sort",this.onSort),this.rows.push(b),this.render()},render:function(){return this.$el.empty(),void 0!==this.attributes&&this.$el.attr(this.attributes),_.each(this.rows,function(a){this.$el.append(a.render().el)},this),this.delegateEvents(),this},onClickHeadRow:function(a){},onSort:function(a){this.trigger("sort",{order:a.order,order_direction:a.order_direction})},resetOrder:function(){_.each(this.rows,function(a){a.resetOrder()},this)},defaultOrder:function(a,b){this.resetOrder(),_.each(this.rows,function(c){c.defaultOrder(a,b)},this)}});b.exports=e},{"./HeadRowView":10}],12:[function(a,b,c){"use strict";var d=a("./HeadView"),e=a("./BodyView"),f=Backbone.View.extend({tagName:"table",events:{"click tr":"onClickRow","click td":"onClickCell"},initialize:function(a){"undeifned"!=typeof a.columns&&(this.columns=a.columns),void 0!==a.HeadView?this.HeadView=a.HeadView:this.HeadView=d,void 0!==a.BodyView?this.BodyView=a.BodyView:this.BodyView=e,void 0!==a.onClickRow&&(this.onClickRow=a.onClickRow),this.Head=new this.HeadView({columns:this.columns}),this.Head.bind("sort",this.onSort,this),this.Body=new this.BodyView({columns:this.columns,collection:this.collection})},render:function(){var a=Backbone.$(this._createElement(_.result(this,"tagName")));return void 0!==this.attributes&&a.attr(this.attributes),this.$el.empty(),a.append(this.Head.render().el),a.append(this.Body.el),this.$el.append(a),this.delegateEvents(),this},onSort:function(a){this.trigger("sort",a)},defaultOrder:function(a,b){this.Head.defaultOrder(a,b)},onClickRow:function(a){},onClickCell:function(a){}});b.exports=f},{"./BodyView":6,"./HeadView":11}],13:[function(a,b,c){b.exports='<div class="th-inner sortable both" data-field="<%- value %>"><%- label %></div>\n'},{}],14:[function(a,b,c){"use strict";var d=a("./template/page_navigator.html"),e=Backbone.View.extend({initialize:function(a){void 0!==a.template?this.template=a.template:this.template=_.template(d),this.collection.bind("sync",this.render,this)},events:{"click .pagination .first":"first","click .pagination .next":"next","click .pagination .prev":"prev","click .pagination .last":"last","click .pagination .page":"page","click .pagination .refresh":"refresh"},render:function(){for(var a={models:this.collection.models,links:this.collection._links,page:this.collection.page,page_count:this.collection.page_count,page_size:this.collection.page_size,total_items:this.collection.total_items},b=[],c=-2;c<3;c++)if(a.page+c>0&&a.page+c<=a.page_count){var d={page:a.page,class:"page",data_page:a.page+c,caption:a.page+c};a.page+c==0&&(d.caption=a.page,d.data_page=a.page),a.page+c==a.page&&(d.class="active"),b.push(d)}a.page<2&&4<a.page_count&&b.push({page_count:a.page_count,page:a.page,class:"page",data_page:4,caption:4}),a.page<3&&5<a.page_count&&b.push({page_count:a.page_count,page:a.page,class:"page",data_page:5,caption:5}),a.nav_pages=b,this.$el.html(this.template(a))},refresh:function(a){this.trigger("go",{page:a.currentTarget.dataset.page})},first:function(a){this.trigger("go",{page:a.currentTarget.dataset.page})},prev:function(a){this.trigger("go",{page:a.currentTarget.dataset.page})},next:function(a){this.trigger("go",{page:a.currentTarget.dataset.page})},last:function(a){this.trigger("go",{page:a.currentTarget.dataset.page})},page:function(a){this.trigger("go",{page:a.currentTarget.dataset.page})}});b.exports=e},{"./template/page_navigator.html":15}],15:[function(a,b,c){b.exports='<div class="row">\n    <div class="col-md-5 col-sm-12">\n        <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">Pagina\n            <%= page %>\n            di <%= page_count %>\n            su <%= total_items %> record\n        </div>\n    </div>\n    <div class="col-md-7 col-sm-12">\n        <div class="" id="sample_1_paginate">\n            <ul class="pagination" style="visibility: visible;">\n                <%\n                var first_class=\'disabled\'\n                var prev_class=\'disabled\'\n                if( page > 1) {\n                prev_class=\'prev\';\n                first_class=\'first\';\n                }\n                %>\n                <li class="<%= first_class %>" data-page="<%= 1 %>">\n                    <a title="First">\n                        <i class="fa fa-angle-double-left"></i>\n                    </a>\n                </li>\n                <li class="<%= prev_class %>" data-page="<%= page - 1 %>">\n                    <a title="Prev">\n                        <i class="fa fa-angle-left"></i>\n                    </a>\n                </li>\n\n                <% for(i=0;i < nav_pages.length;i++){ %>\n                <% var nav_page=nav_pages[i]; %>\n                <li class="<%= nav_page.class %>" data-page="<%= nav_page.data_page %>">\n                    <a title="Page_<%= nav_page.caption%>"><%= nav_page.caption%></a>\n                </li>\n                <% } %>\n\n\n                <%\n                var next_class=\'disabled\'\n                var last_class=\'disabled\'\n                if( page < page_count) {\n                next_class=\'next\';\n                last_class=\'last\';\n                }\n                %>\n                <li class="<%= next_class%>" data-page="<%= page + 1 %>">\n                    <a title="Next">\n                        <i class="fa fa-angle-right"></i>\n                    </a>\n                </li>\n                <li class="<%= last_class%>" data-page="<%= page_count %>">\n                    <a title="Last">\n                        <i class="fa fa-angle-double-right"></i>\n                    </a>\n                </li>\n                <li class="refresh" data-page="<%= page %>">\n                    <a title="refresh">\n                        <i class="fa fa-refresh"></i>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n'},{}],16:[function(a,b,c){"use strict";var d=a("../Toolbar/IconButtonView"),e=a("./template/search.html"),f=Backbone.View.extend({initialize:function(a){void 0!==a.template?this.template=a.template:this.template=_.template(e),void 0!==a.search_columns&&(this.search_columns=a.search_columns),this.render()},events:{"keyup  input":"search"},render:function(){this.$el.html(this.template({})),void 0!==this.attributes&&this.$el.attr(this.attributes)},default:function(a){_.each(this.$("input"),function(a){a.value=this.query},{query:a})},clearSearch:function(){_.each(this.$("input"),function(a){a.value="",this.trigger("search",{})},this)},search:function(a){if(13==a.keyCode){var b={search:a.currentTarget.value,search_into:this.search_columns};this.trigger("search",b)}},getResetButton:function(){var a=new d({attributes:{class:"btn btn-default",name:"reset",title:"Reset search"},icon:{class:"fa fa-remove"},onEvent:function(a){this.trigger("click")}});return a.bind("click",this.clearSearch,this),a.render(),a}});b.exports=f},{"../Toolbar/IconButtonView":19,"./template/search.html":17}],17:[function(a,b,c){b.exports='<input class="form-control" type="text" placeholder="Search">\n'},{}],18:[function(require,module,exports){"use strict";var ButtonGroupView=Backbone.View.extend({tagName:"div",childs:[],events:{click:"onEventGroup"},initialize:function(options){var that=this;this.childs=[],_.each(options.tools,function(tool){if(tool.prototype instanceof Backbone.View)var child=new tool({});else if(tool instanceof Backbone.View)var child=tool;else{if("object"!=typeof tool)return BbTools.Debug.log(tool,"tipo non supportato"),!1;var child=eval("new "+tool.view+"(tool.options)")}that.childs.push(child)})},render:function(){return void 0!==this.attributes&&this.$el.attr(this.attributes),_.each(this.childs,function(a){this.$el.append(a.el),a.render()},this),this.delegateEvents(),this},onEventGroup:function(a){}});module.exports=ButtonGroupView},{}],19:[function(a,b,c){"use strict";var d=Backbone.View.extend({tagName:"button",events:{"click ":"onEvent"},initialize:function(a){void 0!==a.icon&&(this.icon=a.icon),"function"==typeof a.onEvent&&(this.onEvent=a.onEvent),this.template=_.template('<i class="<%- icon.class %>"></i>')},render:function(){return this.$el.empty(),this.$el.append(this.template({icon:this.icon})),this.delegateEvents(),this},onEvent:function(a){this.trigger("button.event",this)}});b.exports=d},{}],20:[function(a,b,c){"use strict";var d={};d.IconButtonView=a("./IconButtonView"),d.ButtonGroupView=a("./ButtonGroupView"),b.exports=d},{"./ButtonGroupView":18,"./IconButtonView":19}],21:[function(a,b,c){(function(b){"use strict";!function(a){var d="object"==typeof self&&self.self===self&&self||"object"==typeof b&&b.global===b&&b;"function"==typeof define&&define.amd?define(["exports"],function(b){d.BbToolsGrid=a(d,b)}):void 0!==c?a(d,c):d.BbToolsGrid=a(d,{})}(function(b,c){var c={};return c.Router=a("./Router/CrudGridRouter"),c.Grid=a("./View/Grid/Grid"),c.PageNavigatorView=a("./View/PageNavigator/PageNavigatorView"),c.Toolbar=a("./View/Toolbar/Toolbar"),c.SearchView=a("./View/Search/SearchView"),c.init=function(){},b.BbToolsGrid=c,c})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Router/CrudGridRouter":1,"./View/Grid/Grid":7,"./View/PageNavigator/PageNavigatorView":14,"./View/Search/SearchView":16,"./View/Toolbar/Toolbar":20}]},{},[21]);