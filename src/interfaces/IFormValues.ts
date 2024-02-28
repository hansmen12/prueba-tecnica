export interface ItemWithAnswer {
  id: number;
  question: string;
  options: string[];
  answer: boolean;
}

export interface IFormValues {
  id?: number;
  documentTypePerson: number;
  documentPerson: string;
  lastnamePerson: string;
  namesPerson: string;
  phonePerson: string;
  emailPerson: string;
  documentTypeInspector: number;
  documentInspector: string;
  lastnameInspector: string;
  namesInspector: string;
  phoneInspector: string;
  emailInspector: string;
  country: string;
  direction: string;
  client: string;
  work: string;
  date: string;
  itemsWithAnswers?: ItemWithAnswer[] | [] | undefined;
}

export interface RegisteredData {
  namesPerson: string;
  emailPerson: string;
  namesInspector: string;
  emailInspector: string;
  itemsWithAnswers: ItemWithAnswer[];
}
