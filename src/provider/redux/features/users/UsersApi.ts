import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "lodash";

export type IUser = {
  createdAt: string;
  name: string;
  avatar: string;
  phoneNumber: string;
  updatedAt: string;
  address: string;
  status: boolean;
  id: string;
};

export type IUserRequest = {
  name: string;
  avatar?: string;
  phoneNumber: string;
  address?: string;
  status: boolean;
};

export type IUserEditRequest = {
  id: string;
  name: string;
  avatar?: string;
  phoneNumber: string;
  address?: string;
  status: boolean;
};

export type IUsersResponse = Array<IUser>;

export const UsersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66260fbf052332d5532179ba.mockapi.io/",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<IUsersResponse, Partial<string>>({
      query: (params) => `rest-api/users?${params}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUser: build.query<IUser, Partial<string>>({
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
    editUser: build.mutation<IUser, Partial<IUserEditRequest>>({
      query: ({ id, ...body }) => ({
        url: `rest-api/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteUser: build.mutation<any, Partial<string>>({
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
