import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {BaseApiQuery} from "./BaseApiQuery";

export const BaseService = createApi({
  baseQuery: BaseApiQuery,
  endpoints: () => ({}),
})