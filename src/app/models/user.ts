import {UserRole} from '../enums/UserRole';
import {AbstractModel} from './abstract.model';

export class User extends AbstractModel {

  id: number;
  name: string;
  email: string;
  active: boolean;
  group: string;
  role: UserRole;
  avatar: string;
  password?: string;

  serialize(): {} {
    return {};
  }

  compare(instance: User): number {
    return this.group === instance.group || this.group === null || instance.group === null
      ? this.name.localeCompare(instance.name)
      : this.group.localeCompare(instance.group);

  }

  static deserialize(obj: any): User {
    const quiz = new User();

    quiz.id = obj['id'];
    quiz.name = obj['name'];
    quiz.group = obj['group'];
    quiz.email = obj['email'];
    quiz.role = obj['role'];
    quiz.active = obj['active'];
    quiz.createdAt = new Date(obj['createdAt']);
    quiz.updatedAt = new Date(obj['updatedAt']);

    return quiz;
  }

  setName(name: string): this {
    this.name = name;

    return this;
  }

  setGroup(group: string): this {
    this.group = group;

    return this;

  }

  setRole(role: UserRole): this {
    this.role = role;

    return this;
  }

  get isActive(): boolean {
    return this.active;
  }

  get isStudent(): boolean {
    return this.role === UserRole.STUDENT;
  }

  get isTeacher(): boolean {
    return this.role === UserRole.TEACHER;
  }
}
