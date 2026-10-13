import { action, computed } from '@ember/object';
import { readOnly, alias } from '@ember/object/computed';
import BaseTableCell from './-private/base-table-cell.js';
import EmberTableSimpleCheckbox from './ember-table-simple-checkbox.js';
import { SELECT_MODE } from '../-private/collapse-tree.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if this.isFirstColumn}}\n  <div class=\"et-cell-container\">\n    {{#if this.canSelect}}\n      <span\n        class=\"et-toggle-select {{unless this.shouldShowCheckbox \'et-speech-only\'}}\"\n        data-test-select-row-container\n      >\n        <this.EmberTableSimpleCheckbox\n          @checked={{this.rowMeta.isGroupSelected}}\n          @onClick={{this.onSelectionToggled}}\n          @ariaLabel=\"Select row\"\n          @dataTestSelectRow={{this.isTesting}}\n        />\n        <span></span>\n      </span>\n    {{/if}}\n\n    {{#if this.canCollapse}}\n      <span class=\"et-toggle-collapse et-depth-indent {{this.depthClass}}\">\n        <this.EmberTableSimpleCheckbox\n          @checked={{this.rowMeta.isCollapsed}}\n          @onChange={{this.onCollapseToggled}}\n          @ariaLabel=\"Collapse row\"\n          @dataTestCollapseRow={{this.isTesting}}\n        />\n        <span></span>\n      </span>\n    {{else}}\n      <div class=\"et-depth-indent et-depth-placeholder {{this.depthClass}}\"></div>\n    {{/if}}\n\n    <div class=\"et-cell-content\">\n      {{#if (has-block)}}\n        {{yield this.cellValue this.columnValue this.rowValue this.cellMeta this.columnMeta this.rowMeta this.rowsCount}}\n      {{else}}\n        {{this.cellValue}}\n      {{/if}}\n    </div>\n  </div>\n{{else}}\n  {{#if (has-block)}}\n    {{yield this.cellValue this.columnValue this.rowValue this.cellMeta this.columnMeta this.rowMeta this.rowsCount}}\n  {{else}}\n    {{this.cellValue}}\n  {{/if}}\n{{/if}}\n");

let setupSimpleCheckboxForTest = false;
function setSimpleCheckboxForTest(bool) {
  setupSimpleCheckboxForTest = bool;
}

/**
 The table cell component. This component manages cell level concerns, yields
 the cell value, column value, row value, and all of their associated meta
 objects.

 ```hbs
 <EmberTable as |t|>
 <t.head @columns={{this.columns}} />

 <t.body @rows={{this.rows}} as |b|>
 <b.row as |r|>
 <r.cell as |cellValue columnValue rowValue cellMeta columnMeta rowMeta|>

 </r.cell>
 </b.row>
 </t.body>
 </EmberTable>
 ```

 @yield {any} cellValue - The value of the cell
 @yield {object} columnValue - The column definition
 @yield {object} rowValue - The row definition

 @yield {object} cellMeta - The meta object associated with the cell
 @yield {object} columnMeta - The meta object associated with the column
 @yield {object} rowMeta - The meta object associated with the row
 @class <EmberTd />
 @public
 */
var EmberTd = setComponentTemplate(TEMPLATE, BaseTableCell.extend({
  EmberTableSimpleCheckbox,
  tagName: 'td',
  init() {
    this._super(...arguments);
    if (setupSimpleCheckboxForTest) {
      this.set('isTesting', true);
    }
  },
  /**
   The API object passed in by the table row
   @argument api
   @required
   @type object
  */
  api: null,
  /**
   Action sent when the user clicks this element
   @argument onClick
   @type Action?
  */
  onClick: null,
  /**
   Action sent when the user double clicks this element
   @argument onDoubleClick
   @type Action?
  */
  onDoubleClick: null,
  // only watch `api` due to a bug in Ember
  // eslint-disable-next-line ember/require-computed-macros
  unwrappedApi: computed('api', function () {
    return this.get('api.api') || this.get('api');
  }),
  cellValue: alias('unwrappedApi.cellValue'),
  cellMeta: readOnly('unwrappedApi.cellMeta'),
  columnValue: readOnly('unwrappedApi.columnValue'),
  columnMeta: readOnly('unwrappedApi.columnMeta'),
  rowValue: readOnly('unwrappedApi.rowValue'),
  rowMeta: readOnly('unwrappedApi.rowMeta'),
  rowsCount: readOnly('unwrappedApi.rowsCount'),
  rowSelectionMode: readOnly('unwrappedApi.rowSelectionMode'),
  checkboxSelectionMode: readOnly('unwrappedApi.checkboxSelectionMode'),
  canCollapse: readOnly('rowMeta.canCollapse'),
  depthClass: computed('rowMeta.depth', function () {
    return `depth-${this.get('rowMeta.depth')}`;
  }),
  canSelect: computed('shouldShowCheckbox', 'rowSelectionMode', function () {
    let rowSelectionMode = this.get('rowSelectionMode');
    let shouldShowCheckbox = this.get('shouldShowCheckbox');
    return shouldShowCheckbox || rowSelectionMode === SELECT_MODE.MULTIPLE || rowSelectionMode === SELECT_MODE.SINGLE;
  }),
  shouldShowCheckbox: computed('checkboxSelectionMode', function () {
    let checkboxSelectionMode = this.get('checkboxSelectionMode');
    return checkboxSelectionMode === SELECT_MODE.MULTIPLE || checkboxSelectionMode === SELECT_MODE.SINGLE;
  }),
  onSelectionToggled: action(function (event) {
    let rowMeta = this.get('rowMeta');
    let checkboxSelectionMode = this.get('checkboxSelectionMode') || this.get('rowSelectionMode');
    if (rowMeta && checkboxSelectionMode === SELECT_MODE.MULTIPLE) {
      let toggle = true;
      let range = event.shiftKey;
      rowMeta.select({
        toggle,
        range
      });
    } else if (rowMeta && checkboxSelectionMode === SELECT_MODE.SINGLE) {
      rowMeta.select();
    }
    this.sendFullAction('onSelect');
  }),
  onCollapseToggled: action(function () {
    let rowMeta = this.get('rowMeta');
    rowMeta.toggleCollapse();
    this.sendFullAction('onCollapse');
  }),
  click(event) {
    this.sendFullAction('onClick', {
      event
    });
  },
  doubleClick(event) {
    this.sendFullAction('onDoubleClick', {
      event
    });
  },
  sendFullAction(action, values = {}) {
    // If the action doesn't exist, it's not being used. Do nothing
    if (!this.get(action)) {
      return;
    }
    let cellValue = this.get('cellValue');
    let cellMeta = this.get('cellMeta');
    let columnValue = this.get('columnValue');
    let columnMeta = this.get('columnMeta');
    let rowValue = this.get('rowValue');
    let rowMeta = this.get('rowMeta');
    Object.assign(values, {
      cellValue,
      cellMeta,
      columnValue,
      columnMeta,
      rowValue,
      rowMeta
    });
    let closureAction = this[action];
    closureAction?.(values);
  }
}));

export { EmberTd as default, setSimpleCheckboxForTest };
//# sourceMappingURL=ember-td.js.map
