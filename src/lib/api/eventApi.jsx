import { baseApi } from "./baseApi";



export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        showEvents: builder.mutation({
            query: 'events',
            Method: 'GET',
        }),

    })
})

export const {
    useFetchEventsMutation
} = eventApi;
