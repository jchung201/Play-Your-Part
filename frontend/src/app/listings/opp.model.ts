export class Opp {
  constructor(
    public organization: string,
    public location: string,
    public contact: string,
    public title: string,
    public description: string,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string
  ) {}
}
