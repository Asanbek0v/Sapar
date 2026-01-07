import { api } from "../index";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TODO.GetTodoResponse, TODO.GetTodoRequest>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
  }),
});

export const { useGetTodosQuery } = extendedApi;
