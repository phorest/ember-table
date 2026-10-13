import Component, { setComponentTemplate } from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { precompileTemplate } from '@ember/template-compilation';

var TEMPLATE = precompileTemplate("  {{#if this.isResizable}}\n    <div data-test-resize-handle class=\"et-header-resize-area\">\n    </div>\n  {{/if}}");

var ResizeHandle = setComponentTemplate(TEMPLATE, Component.extend({
  tagName: '',
  /**
    The API object passed in by the table header cell
    @argument columnMeta
    @required
    @type object
  */
  columnMeta: null,
  isResizable: readOnly('columnMeta.isResizable')
}));

export { ResizeHandle as default };
//# sourceMappingURL=resize-handle.js.map
