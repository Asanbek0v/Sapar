namespace TODO {
  interface IForm {
    _id?: number;
    title: string;
  }
  type GetTodoResponse = void;
  type GetTodoRequest = IForm[];
}
