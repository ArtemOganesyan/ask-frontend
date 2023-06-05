import * as moment from 'moment';
import {DATE_TIME_FORMAT} from '../app.config';
import {Moment} from 'moment';

export abstract class AbstractModel {

  abstract serialize(): {};
  abstract compare(instance: AbstractModel): number;

  public id: number;
  public createdAt: Date = null;
  public updatedAt: Date = null;

  public setId(id: number): this {
    this.id = id;

    return this;
  }

  public setCreateAtFromString(string): this {
    this.createdAt = new Date(string);

    return this;
  }

  public setUpdateAtFromString(string): this {
    this.updatedAt = new Date(string);

    return this;
  }

  public createdAtString(): string {
    return moment(this.createdAt).format(DATE_TIME_FORMAT);
  }

  public updatedAtString(): string {
    return moment(this.updatedAt).format(DATE_TIME_FORMAT);
  }

  //TODO: Review This Part

  get createdMoment(): Moment {
    return moment(this.createdAt);
  }

  get createdMomentAsString(): string {
    return moment(this.createdAt).format('MM/DD/YY HH:mm');
  }

  get createDateAsString(): string {
    return this.createdMoment.format('MM/DD/YY');
  }
}


