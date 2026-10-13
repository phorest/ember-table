import Component, { setComponentTemplate } from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { precompileTemplate } from '@ember/template-compilation';

var TEMPLATE = precompileTemplate("{{#if this.isSorted}}\n  <span data-test-sort-indicator class=\"et-sort-indicator {{if this.isSortedAsc \'is-ascending\' \'is-descending\'}}\">\n    {{#if (has-block)}}\n      {{yield this.columnMeta}}\n    {{else}}\n      {{#if this.isMultiSorted}}\n        {{this.sortIndex}}\n      {{/if}}\n    {{/if}}\n  </span>\n{{/if}}\n\n{{#if this.isSortable}}\n  <button data-test-sort-toggle class=\"et-sort-toggle et-speech-only\">Toggle Sort</button>\n{{/if}}\n");

var SortIndicator = setComponentTemplate(TEMPLATE, Component.extend({
  tagName: '',
  /**
    The API object passed in by the table header cell
    @argument columnMeta
    @required
    @type object
  */
  columnMeta: null,
  isSortable: readOnly('columnMeta.isSortable'),
  isSorted: readOnly('columnMeta.isSorted'),
  isSortedAsc: readOnly('columnMeta.isSortedAsc'),
  isMultiSorted: readOnly('columnMeta.isMultiSorted'),
  sortIndex: readOnly('columnMeta.sortIndex')
}));

export { SortIndicator as default };
//# sourceMappingURL=sort-indicator.js.map
