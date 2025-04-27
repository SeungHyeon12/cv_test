export class Student {
  public readonly id: string;
  public name: string;
  public createdAt: string;

  constructor(args: { id: string; name: string; createdAt: string }) {
    this.id = args.id;
    this.name = args.name;
    this.createdAt = args.createdAt;
  }

  static createOf(args: { id: string; name: string }) {
    return new Student({
      id: args.id,
      name: args.name,

      createdAt: new Date().toISOString(),
    });
  }
}
