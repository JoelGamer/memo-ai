import LocalStorageApplicationRecord from '../lib/local-storage-db/local-storage-application-record';
import memoContent from './memo-content';

class Memo extends LocalStorageApplicationRecord<MemoRecord> {
  constructor() {
    super('Memo');
  }

  async memo_content(memo: MemoRecord) {
    return (await memoContent.find_by({ memoId: memo.id }))[0];
  }
}

export default new Memo();
