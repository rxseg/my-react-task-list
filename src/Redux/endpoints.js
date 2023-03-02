import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Tasks = createApi({
  reducerPath: "Tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["refreshTasks", "refreshAddTaks", "deleteRefresh", "editRefresh"],
  keepUnusedDataFor: 3,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (token) => ({
        url: "/api/tasklist",
        method: "GET",
        headers: { "Content-Type": "application/json", token },
      }),
      providesTags: ["refreshTasks"],
    }),
    getCompletedTasks: builder.query({
      query: (token) => ({
        url: "/api/tasklist/completed",
        method: "GET",
        headers: { "Content-Type": "application/json", token },
      }),
      providesTags: ["refreshTasks"],
    }),
    getIncompletedTasks: builder.query({
      query: (token) => ({
        url: "/api/tasklist/incompleted",
        method: "GET",
        headers: { "Content-Type": "application/json", token },
      }),
      providesTags: ["refreshTasks"],
    }),
    postTasks: builder.mutation({
      query: ({ createTask, token }) => ({
        body: createTask,
        url: "/api/tasklist",
        method: "POST",
        headers: { "Content-Type": "application/json", token },
      }),
      invalidatesTags: ["refreshTasks", "refreshAddTaks"],
    }),
    postUser: builder.mutation({
      query: (createUser) => ({
        body: createUser,
        url: "/api/signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    patchUser: builder.query({
      query: (dataLogin) => ({
        body: dataLogin,
        url: "/api/login",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    deleteTasks: builder.mutation({
      query: ({ _id, token }) => ({
        url: `/api/tasklist/${_id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json", token },
      }),
      invalidatesTags: ["refreshTasks", "refreshAddTaks", "deleteRefresh"],
    }),
    updateTasks: builder.mutation({
      query: ({ _id, dataTasks, token }) => ({
        url: `/api/tasklist/editar-tarea/${_id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json", token },
        body: dataTasks,
      }),
      invalidatesTags: [
        "refreshTasks",
        "refreshAddTaks",
        "deleteRefresh",
        "editRefresh",
      ],
    }),
    updateState: builder.mutation({
      query: ({ _id, dataEstado, token }) => ({
        url: `/api/tasklist/editar-estado/${_id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json", token },
        body: dataEstado,
      }),
      invalidatesTags: [
        "refreshTasks",
        "refreshAddTaks",
        "deleteRefresh",
        "editRefresh",
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTasksQuery,
  useGetCompletedTasksQuery,
  useGetIncompletedTasksQuery,
  usePostTasksMutation,
  usePostUserMutation,
  usePatchUserQuery,
  useDeleteTasksMutation,
  useUpdateTasksMutation,
  useUpdateStateMutation,
} = Tasks;
