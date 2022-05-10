import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { classToTableName } from './camelize';
import LocalStorageEvent from './local-storage-events';

class LocalStorageRecordNotFound extends Error {
  constructor(table: string, id: ActiveRecord['id']) {
    super(`Couldn't find ${table} with 'id'=${id}`);
  }
}

class LocalStorageApplicationRecord<T extends ActiveRecord> {
  private tableName = '';

  constructor(name: string) {
    this.tableName = classToTableName(name);
  }

  all() {
    return this.getTable();
  }

  async find(id: T['id']) {
    const record = (await this.getTable()).find(({ id: _id }) => _id === id);

    if (record) return record;

    throw new LocalStorageRecordNotFound(this.tableName, id);
  }

  async find_by(options: FindByOptions<T>) {
    return (await this.getTable()).filter((item) => {
      const filters = Object.entries(options) as [keyof T, any][];
      const assertions = filters.map(([key, value]) => item[key] === value);
      return assertions.filter((v) => v === false).length === 0;
    });
  }

  async create(record: Omit<T, 'id'>) {
    const table = await this.getTable();
    const newRecord = { ...record, id: uuid() } as T;
    table.push(newRecord);

    await this.setTable(table);
    this.dispatchEvent('create');

    return newRecord;
  }

  async delete(id: T['id']) {
    const table = await this.getTable();
    const newTable = table.filter(({ id: _id }) => _id !== id);

    if (newTable.length === table.length) {
      throw new LocalStorageRecordNotFound(this.tableName, id);
    }

    await this.setTable(newTable);
    this.dispatchEvent('delete');
  }

  addEventListener(type: EventType, listener: () => void) {
    LocalStorageEvent.addEventListener(this.eventType(type), listener);
  }

  removeEventListener(type: EventType, listener: () => void) {
    LocalStorageEvent.removeEventListener(this.eventType(type), listener);
  }

  private dispatchEvent(type: EventType) {
    LocalStorageEvent.dispatchEvent(this.eventType(type));
  }

  private async getTable(): Promise<T[]> {
    const rawTable = await AsyncStorage.getItem(this.tableName);
    return rawTable ? JSON.parse(rawTable) : [];
  }

  private async setTable(value: any) {
    await AsyncStorage.setItem(this.tableName, JSON.stringify(value));
  }

  private eventType(type: string) {
    return `${this.tableName}-${type}`;
  }
}

export default LocalStorageApplicationRecord;

type EventType = 'create' | 'delete';

type FindByOptions<T> = {
  [Property in keyof T]?: T[Property];
};
