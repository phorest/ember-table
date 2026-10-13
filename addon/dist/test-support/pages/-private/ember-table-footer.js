import { collection } from 'ember-classy-page-object';
import EmberTableBodyPage, { BodyCell } from './ember-table-body.js';

var EmberTableFooterPage = EmberTableBodyPage.extend({
  scope: 'tfoot',
  footers: collection('td:not([data-test-ember-table-slack])', BodyCell),
  slackFooters: collection('td[data-test-ember-table-slack]', BodyCell)
});

export { EmberTableFooterPage as default };
//# sourceMappingURL=ember-table-footer.js.map
