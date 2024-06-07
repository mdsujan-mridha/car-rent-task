import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://exam-server-7c41747804bf.herokuapp.com/" }),
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => `carsList`
    }),
  }),
});

export const { useGetCarsQuery } = carApi; // Note the correct hook name
