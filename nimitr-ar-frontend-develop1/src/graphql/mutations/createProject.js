import gql from 'graphql-tag'

export default gql`
mutation ( $user: MongoID!, $name: String!, $url: String   ){
    createProject(record: {
            user: $user,
            name: $name,
            url: $url,
        }) {
        recordId
    }
}
`
