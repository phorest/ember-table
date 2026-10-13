import { A } from '@ember/array';
import { computed } from '@ember/object';
import EmberTbody from './ember-tbody.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#each this.wrappedRowArray as |rowValue|}}\n  <this.RowWrapper\n    @rowValue={{rowValue}}\n    @columns={{this.columns}}\n    @columnMetaCache={{this.columnMetaCache}}\n    @rowMetaCache={{this.rowMetaCache}}\n    @canSelect={{this.canSelect}}\n    @rowSelectionMode={{this.rowSelectionMode}}\n    @checkboxSelectionMode={{this.checkboxSelectionMode}}\n    @rowsCount={{this.wrappedRowArray.length}} as |api|\n  >\n    {{#if (has-block)}}\n      {{yield (hash\n        rowValue=api.rowValue\n        rowMeta=api.rowMeta\n        cells=api.cells\n        rowSelectionMode=api.rowSelectionMode\n        rowsCount=api.rowsCount\n\n        row=(component (ensure-safe-component this.EmberTr) api=api)\n      )}}\n    {{else}}\n      <this.EmberTr @api={{api}} />\n    {{/if}}\n  </this.RowWrapper>\n{{/each}}\n");

var EmberTfoot = setComponentTemplate(TEMPLATE, EmberTbody.extend({
  tagName: 'tfoot',
  wrappedRowArray: computed('wrappedRows.[]', function () {
    let wrappedRows = this.get('wrappedRows');
    let wrappedRowsLength = wrappedRows.get('length');
    let arr = [];
    for (let i = 0; i < wrappedRowsLength; i++) {
      arr.push(wrappedRows.objectAt(i));
    }
    return A(arr);
  })
}));

export { EmberTfoot as default };
//# sourceMappingURL=ember-tfoot.js.map
