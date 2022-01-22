import {createApi} from "@reduxjs/toolkit/query";
import {b

  aseApiQuery} from "../baseApiQuery";

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: baseApiQuery
})