import LocalStorageApplicationRecord from '../lib/local-storage-db/local-storage-application-record';

class MemoContent extends LocalStorageApplicationRecord<MemoContentRecord> {
  constructor() {
    super('MemoContent');
  }
}

export default new MemoContent();
