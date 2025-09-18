
export interface ISubjectRes {
  message: string;
  metadata: Metadata;
  subjects: Isubject[];
}

export interface Isubject {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
export interface ISingleSubjectRes {
  message: string;
  category: Category;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}