import Component, { setComponentTemplate } from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { SELECT_MODE } from '../-private/collapse-tree.js';
import { closest } from '../-private/utils/element.js';
import EmberTd from './ember-td.js';
import EmberTh from './ember-th.js';
import { precompileTemplate } from '@ember/template-compilation';

var TEMPLATE = precompileTemplate("{{#each this.cells as |api|}}\n  {{#if (has-block)}}\n    {{#if this.isHeader}}\n      {{yield (hash\n        columnValue=api.columnValue\n        columnMeta=api.columnMeta\n\n        sorts=api.sorts\n        sendUpdateSort=api.sendUpdateSort\n\n        rowMeta=api.rowMeta\n        rowsCount=api.rowsCount\n\n        cell=(component (ensure-safe-component this.EmberTh) api=api)\n      )}}\n    {{else}}\n      {{yield (hash\n        api=api\n\n        cellValue=api.cellValue\n        cellMeta=api.cellMeta\n\n        columnValue=api.columnValue\n        columnMeta=api.columnMeta\n\n        rowValue=api.rowValue\n        rowMeta=api.rowMeta\n\n        rowsCount=api.rowsCount\n\n        cell=(component (ensure-safe-component this.EmberTd) api=api)\n      )}}\n    {{/if}}\n  {{else if this.isHeader}}\n    <this.EmberTh @api={{api}} />\n  {{else}}\n    <this.EmberTd @api={{api}} />\n  {{/if}}\n{{/each}}\n");

var EmberTr = setComponentTemplate(TEMPLATE, Component.extend({
  tagName: 'tr',
  EmberTd,
  EmberTh,
  classNames: ['et-tr'],
  classNameBindings: ['isEven:is-even:is-odd', 'isGroupSelected', 'isSelectable', 'isSelected'],
  /**
    The API object passed in by the table body, header, or footer
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
  rowValue: readOnly('api.rowValue'),
  rowMeta: readOnly('api.rowMeta'),
  cells: readOnly('api.cells'),
  rowSelectionMode: readOnly('api.rowSelectionMode'),
  rowToggleMode: readOnly('api.rowToggleMode'),
  isHeader: readOnly('api.isHeader'),
  isSelected: readOnly('rowMeta.isSelected'),
  isGroupSelected: readOnly('rowMeta.isGroupSelected'),
  isEven: computed('rowMeta.index', function () {
    let index = this.rowMeta?.index ?? 0;
    return index % 2 === 0;
  }),
  isSelectable: computed('rowSelectionMode', function () {
    let rowSelectionMode = this.get('rowSelectionMode');
    return rowSelectionMode === SELECT_MODE.MULTIPLE || rowSelectionMode === SELECT_MODE.SINGLE;
  }),
  click(event) {
    let rowSelectionMode = this.get('rowSelectionMode');
    let inputParent = closest(event.target, 'input, button, label, a, select');
    if (!inputParent) {
      let rowMeta = this.get('rowMeta');
      if (rowMeta && rowSelectionMode === SELECT_MODE.MULTIPLE) {
        let toggle = event.ctrlKey || event.metaKey || this.get('rowToggleMode');
        let range = event.shiftKey;
        rowMeta.select({
          toggle,
          range
        });
      } else if (rowMeta && rowSelectionMode === SELECT_MODE.SINGLE) {
        rowMeta.select({
          single: true
        });
      }
    }
    this.sendEventAction('onClick', event);
  },
  doubleClick(event) {
    this.sendEventAction('onDoubleClick', event);
  },
  sendEventAction(action, event) {
    let rowValue = this.get('rowValue');
    let rowMeta = this.get('rowMeta');
    let closureAction = this[action];
    closureAction?.({
      event,
      rowValue,
      rowMeta
    });
  }
}));

export { EmberTr as default };
//# sourceMappingURL=ember-tr.js.map
