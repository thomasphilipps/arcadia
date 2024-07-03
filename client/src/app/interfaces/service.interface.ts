import { Image } from './image.interface';

export interface Service {
  serviceId: number;
  serviceName: string;
  serviceShortDescr: string;
  serviceLongDescr: string;
  images?: Image[];
}
