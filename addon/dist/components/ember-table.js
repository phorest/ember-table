import "./../styles/addon.css"
import Component, { setComponentTemplate } from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { teardownTableStickyPolyfill, setupTableStickyPolyfill } from '../-private/sticky/table-sticky-polyfill.js';
import ScrollIndicators from './-private/scroll-indicators.js';
import EmberTableLoadingMore from './ember-table-loading-more.js';
import EmberTbody from './ember-tbody.js';
import EmberTfoot from './ember-tfoot.js';
import EmberThead from './ember-thead.js';
import { precompileTemplate } from '@ember/template-compilation';

;

var TEMPLATE = precompileTemplate("<div\n  data-test-ember-table-overflow\n  class=\"ember-table-overflow\"\n  id=\"{{this.elementId}}-overflow\"\n>\n  <table>\n    {{yield (hash\n      api=this.api\n      head=(component (ensure-safe-component this.EmberThead) api=this.api)\n      body=(component (ensure-safe-component this.EmberTbody) api=this.api)\n      foot=(component (ensure-safe-component this.EmberTfoot) api=this.api)\n      loadingMore=(component (ensure-safe-component this.EmberTableLoadingMore) api=this.api)\n    )}}\n  </table>\n</div>\n<this.ScrollIndicators @api={{this.api}} />\n");

var emberTable = setComponentTemplate(TEMPLATE, Component.extend({
  classNames: ['ember-table'],
  attributeBindings: ['dataTestEmberTable:data-test-ember-table'],
  dataTestEmberTable: true,
  // Referenced from the template via ensure-safe-component so Embroider can analyze them
  EmberTableLoadingMore,
  EmberTbody,
  EmberTfoot,
  EmberThead,
  ScrollIndicators,
  didInsertElement() {
    this._super(...arguments);
    let thead = this.element.querySelector('thead');
    let tfoot = this.element.querySelector('tfoot');
    if (thead) {
      setupTableStickyPolyfill(thead);
    }
    if (tfoot) {
      setupTableStickyPolyfill(tfoot);
    }
  },
  willDestroyElement() {
    let thead = this.element.querySelector('thead');
    let tfoot = this.element.querySelector('tfoot');
    if (thead) {
      teardownTableStickyPolyfill(this.element.querySelector('thead'));
    }
    if (tfoot) {
      teardownTableStickyPolyfill(this.element.querySelector('tfoot'));
    }
    this._super(...arguments);
  },
  tableStyle: computed('tableWidth', function () {
    return htmlSafe(`width: ${this.get('tableWidth')}px;`);
  }),
  api: computed(function () {
    return {
      columns: null,
      registerColumnTree: this.registerColumnTree.bind(this),
      tableId: `${this.elementId}-overflow`
    };
  }),
  registerColumnTree(columnTree) {
    this.set('api.columnTree', columnTree);
  }
}));

export { emberTable as default };
//# sourceMappingURL=ember-table.js.map
