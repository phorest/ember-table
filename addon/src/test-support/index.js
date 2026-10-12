import TablePage from './pages/ember-table';
import { setSetupRowCountForTest } from '../components/ember-tbody';
import { setupTHeadForTest } from '../components/ember-thead';
import { setSimpleCheckboxForTest } from '../components/ember-td';

function setupForTest() {
  setSetupRowCountForTest(true);
  setupTHeadForTest(true);
  setSimpleCheckboxForTest(true);
}

export { TablePage, setupForTest };
