import { apiSlice } from '@/lib/config/apiSlice'
import { gql } from 'graphql-request'

interface MembersQueryVariables {
    first: number
    filter: any
}

interface MemberSearchByNameVariables {
    search?: string
}

export const memberApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMember: builder.mutation<any, MembersQueryVariables>({
            query: ({ first, filter }) => ({
                document: gql`
                    query Members($first: Int, $filter: MemberFilterInput) {
                        members(first: $first, filter: $filter) {
                            edges {
                                node {
                                    id
                                    ... on Member {
                                        name
                                        verificationStatus
                                        emailAddress
                                        mobileNumber
                                        domain
                                        dateTimeCreated
                                        dateTimeLastActive
                                        status
                                        wallet {
                                            balance
                                        }
                                    }
                                }
                            }
                            pageInfo {
                                hasNextPage
                                endCursor
                            }
                        }
                    }
                `,
                variables: { first, filter },
            }),
        }),
        getMemberNameRecommendation: builder.mutation<any, MemberSearchByNameVariables>({
            query: ({ search }) => ({
                document: gql`
                    query ($search: String!) {
                        membersByName(search: $search, first: 5) {
                            id
                            name
                        }
                    }
                `,
                variables: { search },
            }),
        }),
    }),
})

export const { useGetMemberMutation, useGetMemberNameRecommendationMutation } = memberApi
