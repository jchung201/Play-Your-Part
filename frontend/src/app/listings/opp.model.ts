export class Opp {
  constructor(
    public searchType: string,
    public category: string,
    public title: string,
    public description: string,
    public author: string,
    public location: string,
    public contact: string,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string
  ) {}
}
