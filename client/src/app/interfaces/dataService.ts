import { Observable } from 'rxjs';

export interface DataService<T> {
  getAllData(): Observable<T[]>;
  createData(item: T): Observable<T>;
  updateData(id: number, item: T): Observable<T>;
  deleteData(id: number): Observable<any>;
}
