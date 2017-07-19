'use strict';


/**
 * specs:
 * - bind tra l'editor e un attributo del model
 * - evento change dell'editor aggiorna l'attributo del model
 * - evento change dell'attributo del model aggiorna il valore dell'editor
 * - archivia il valore in maniera indipendente dalla visualizzazione
 * - delega la validazione alla chiamata restful
 * - gestisce lo stato delle validazioni inoltrate dal Restful
 *
 * comportamento di default:
 * l'editor presuppone l'esistenza di un elemento con classe .data-editor che esponga la proprietà "value" e possa
 * lanciare un evento change
 *
 * sull'evento change di .data-editor aggiorna il valore di value ed esegue this.validate; se vengono violate regole
 * di validazione viene anciato l'evento editor.value.invalid
 *
 */
var FormFieldEditorView;
FormFieldEditorView = Backbone.View.extend({
    events: {
        'change .data-editor': 'onChange',
        'keyup .data-editor': 'onKeyUp',
    },
    attributes: {},
    view_attributes: {},
    initialize: function (options) {
        if (!options.model) throw new Error("option obbligatoria non definita: 'model'");
        if (typeof  options.onEvent == 'function') {
            this.onEvent = options.onEvent;
        }
        if (typeof  options.onChange == 'function') {
            this.onChange = options.onChange;
        }
        if (typeof  options.onKeyUp == 'function') {
            this.onKeyUp = options.onKeyUp;
        }
        this.view_attributes = (typeof options.view_attributes != 'undefined') ? options.view_attributes : this.view_attributes;

        this.bind('editor.value.invalid', this.onValueInvalid);
        if (typeof options.key != 'undefined') {
            this.key = options.key;
            this.model.bind('change:' + this.key, this.onModelChange, this);
        }
        this.name = (typeof options.name != 'undefined')? options.name : this.key;

        this.listenTo(this.model, 'error', this.onModelError, this);

    },
    /**
     * override di questo metodo per renderizzare l'editor
     *
     * @returns {ButtonSubmitEditorView}
     */
    render: function (options) {
        // console.log({'render':options});
        // console.trace();
        this.trigger('editor.render', {'editor': this});

        return this;
    },

    /**
     * evento generico
     *
     * @param e
     */
    onEvent: function (e) {
        this.trigger('editor.event', this);
    },

    /**
     * listener dell'evento editor.value.invalid
     * @param e
     */
    onValueInvalid: function (e) {
        BbTools.Debug.log(e, 'evento editor.value.invalid intercettato ');

    },

    /**
     * listener dell'evento model change:[attribute]
     * @param e
     */
    onModelError: function (model, e) {
        if (e.status == 422) {
            if (_.has(e.responseJSON.validation_messages, this.key)) {
                var messages = _.propertyOf(e.responseJSON.validation_messages)(this.key);
                this.trigger('editor.model.error', {'messages': messages});
            }
        }

    },

    /**
     * listener dell'evento model change:[attribute]
     * @param e
     */
    onModelChange: function (model, value, options) {
        this.setValue(value);

    },

    /**
     * get editor value
     * estendere e sovrascrivere per le specifiche dell'editor
     *
     * @returns {string}
     */
    getValue: function () {
        return this.value;
    },

    /**
     * set editor value
     * estendere e sovrascrivere per le specifiche dell'editor
     *
     * @param value
     */
    setValue: function (value) {
        this.value = value;
        this.trigger('editor.set.value', {editor: this, value: value});
    },

    /**
     * funzione che intercetta l'evento di change
     * estendere per personalizzare
     *
     * @param e
     */
    onChange: function (e) {
        var value = e.currentTarget.value;
        value = this.filter(value);
        this.model.set(this.key, value);
    },

    /**
     * funzione che intercetta l'evento keyup sul campo
     * @param e
     */
    onKeyUp:function(e){

    },

    /**
     *
     * @returns {boolean}
     */
    validate: function () {
        BbTools.Debug.log('metodo validate non implementato');
        return true;
    },

    /**
     * filtro da apllicare al value prima di scrivere nel model
     *
     * @param value
     */
    filter: function (value) {
        return value;
    }


});
module.exports = FormFieldEditorView;