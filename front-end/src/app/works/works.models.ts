export interface IWork {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  github: string;
  preview: string;
}

export interface ICategory {
  _id: string;
  name: string;
  worksMap: Map<string, IWork>;
  worksArray: IWork[];
}
