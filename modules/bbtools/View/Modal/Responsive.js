'use strict';
var template = require('./template/responsive.hbs');

var Responsive = Backbone.View.extend({
  tagName: 'div',
  el: 'body',
  events: {
    "click button#button-yes": "onYes",
    "click button#button-no": "onNo",
    "click button#button-ok": "onOk",
    "click button#button-cancel": "onCancel",
  },
  title: 'Attenzione',
  message: '',
  buttons: ['chiudi'],
  id: 'responsive',

  initialize: function (options) {
    if (typeof options.template != 'undefined') {
      this.template = options.template;
    } else {
      this.template = _.template(template);
    }

    if (typeof options.id != 'undefined') {
      this.id = options.id;
    }
    if (typeof options.title != 'undefined') {
      this.title = options.title;
    }
    if (typeof options.buttons != 'undefined') {
      this.buttons = options.buttons;
    }
    if (typeof options.message != 'undefined') {
      this.message = options.message;
    }
    if (typeof options.onClose == 'function') {
      this.onClose = options.onClose;
    }
  },
  render: function () {
    // this._ensureElement();
    var options = {
      id: this.id,
      title: this.title,
      buttons: this.buttons,
      message: this.message
    };
    this.$('#' + this.id).remove();

    this.$el.append(this.template(options));
    this.delegateEvents();
    this.$el.one('show.bs.modal', { this: this }, this.onModalBeforeShow);
    this.$el.one('shown.bs.modal', { this: this }, this.onModalShow);
    this.$el.one('hide.bs.modal', { this: this }, this.onModalBeforeHide);
    this.$el.one('hidden.bs.modal', { this: this }, this.onModalHide);
    return this;
  },
  show: function () {
    this.render();
    this.$('#' + this.id).modal('show');
  },

  onYes: function (e) {

    this.trigger('yes', e);
    this.$('#' + this.id).modal('hide');
    this.offAll();
  },
  onNo: function (e) {
    this.trigger('no', e);
    this.$('#' + this.id).modal('hide');
    this.offAll();
  },
  onOk: function (e) {
    this.trigger('ok', e);
    this.$('#' + this.id).modal('hide');
    this.offAll();
  },
  onCancel: function (e) {
    this.trigger('cancel', e);
    this.$('#' + this.id).modal('hide');
    this.offAll();
  },

  onClose: function (e) {
    this.trigger('modal.close', e);
    this.offAll();
  },

  onModalBeforeShow: function (e) {
    e.data.this.trigger('modal.before.show', e);
  },

  onModalShow: function (e) {
    e.data.this.trigger('modal.show', e);
  },

  onModalBeforeHide: function (e) {
    e.data.this.trigger('modal.before.hide', e);
  },

  /**
   * le righe 104 105 sono state commentate perchè avevano un effetto non desiderabile:
   * la prima eliminava completamente dal dom il target che era un campo input di una form
   * la seconda eliminava la modal ma lasciava nel dom il fadein; se la rimozione dovesse avere degli effetti
   * altrove cercare una soluzione alternativa
   * @param e
   */
  onModalHide: function (e) {
    var that = e.data.this;
    that.trigger('modal.hide', e);
    // e.target.remove();
    // that.$('#' + that.id).remove();
  },

  offAll: function () {
    this.off('yes');
    this.off('no');
    this.off('ok');
    this.off('cancel');
    this.off('modal.hide');
    this.off('modal.close');
    this.off('modal.before.hide');
  }

});
module.exports = Responsive;
