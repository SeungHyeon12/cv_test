import { Submission } from './submission';

export class Student {
  public readonly id: string;
  public name: string;
  public createdAt: string;
  public suubmissions: Submission[];

  constructor(args: {
    id: string;
    name: string;
    createdAt: string;
    subMissions: Submission[];
  }) {
    this.id = args.id;
    this.name = args.name;
    this.suubmissions = args.subMissions;
    this.createdAt = args.createdAt;
  }

  static createOf(args: { id: string; name: string }) {
    return new Student({
      id: args.id,
      name: args.name,
      subMissions: [],
      createdAt: new Date().toISOString(),
    });
  }
}
