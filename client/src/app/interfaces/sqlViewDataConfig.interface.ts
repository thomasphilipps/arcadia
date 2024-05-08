export interface SqlViewDataConfig<T> {
  labelL: string;
  primaryKey: string;
  displayColumns: {
    key: string;
    label: string;
  }[];
  actions?: { view: boolean; edit: boolean; delete: boolean };
}
