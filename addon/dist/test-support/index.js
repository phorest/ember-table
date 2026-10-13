export { default as TablePage } from './pages/ember-table.js';
import { setSetupRowCountForTest } from '../components/ember-tbody.js';
import { setupTHeadForTest } from '../components/ember-thead.js';
import { setSimpleCheckboxForTest } from '../components/ember-td.js';

function setupForTest() {
  setSetupRowCountForTest(true);
  setupTHeadForTest(true);
  setSimpleCheckboxForTest(true);
}

export { setupForTest };
//# sourceMappingURL=index.js.map
