import { convertToParam } from "@/utils/converts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get, result } from "lodash";

export type IUser = {
  createdAt: String;
  name: String;
  avatar: String;
  phoneNumber: String;
  updatedAt: String;
  address: String;
  status: boolean;
  id: String;
};

export type IUserRequest = {
  name: String;
  avatar?: String;
  phoneNumber: String;
  address?: String;
  status: boolean;
};

export type IUsersResponse = Array<IUser>;

export const UsersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66260fbf052332d5532179ba.mockapi.io/",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<IUsersResponse, Partial<String>>({
      query: (params) => `rest-api/users?${params}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUser: build.query<IUser, Partial<String>>({
      query: (userId) => `rest-api/users/${userId}`,
      providesTags: (result) =>
        result
          ? [
              { type: "Users", id: get(result, "id") },
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    addUser: build.mutation<IUser, Partial<IUserRequest>>({
      query: (body) => ({
        url: `rest-api/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    editUser: build.mutation<
      IUser,
      Partial<{
        id: String;
        body: IUserRequest;
      }>
    >({
      query: ({ id, body }) => ({
        url: `rest-api/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteUser: build.mutation<any, Partial<String>>({
      query: (id) => ({
        url: `rest-api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = UsersApi;
