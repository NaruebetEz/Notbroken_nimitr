import { GraphQLClient } from "kikstart-graphql-client"

const client = new GraphQLClient({
    url: 'http://localhost:4000/graphql',
    wsUrl: 'ws://localhost:4000/graphql'
})
export default client