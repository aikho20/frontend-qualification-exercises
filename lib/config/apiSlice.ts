import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://report.development.opexa.io/graphql/');

client.setHeader('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjakp0ZFdQaGhkUHlYU25SdSIsInJvbGUiOiJBRE1JTiIsImp0aSI6ImE4MjFlYjM1Y2NmZjI0NjAwNjI0ZGFjYSIsImlwQWRkcmVzcyI6IjE0My40NC4xOTIuMTA3IiwibG9jYXRpb24iOiJDYWdheWFuIGRlIE9ybywgUGhpbGlwcGluZXMiLCJwbGF0Zm9ybSI6IjEydXd1UkNjWXAxY1dpWHpQWSIsImlhcCI6IjIwMjQtMDQtMjRUMDA6MTc6MjAuMDI4KzAwOjAwIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxMzkxNzg3MCwiZXhwIjoxNzc2OTg5ODcwfQ.UfB36fjFrYvg8TV9VYEtNfG6CzRlz9pnjKnqfru-1Hc')
export const baseQuery = graphqlRequestBaseQuery({
    client
})

export const apiSlice = createApi({
    baseQuery,
    endpoints: (builder) => ({}),
})