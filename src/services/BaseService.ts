import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {BaseServiceQuery} from "./BaseServiceQuery";

export const BaseService = createApi({
  tagTypes: ['User'],
  baseQuery: BaseServiceQuery,
  endpoints: () => ({}),
})