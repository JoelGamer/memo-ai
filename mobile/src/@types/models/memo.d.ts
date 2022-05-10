interface MemoRecord extends ActiveRecord {
  title: string;
  summary: string;
}

interface MemoContentRecord extends ActiveRecord {
  text: string;
  fileId: string;
  memoId: ActiveRecord['id'];
}
