import gql from 'graphql-tag'

export default gql`
mutation ( $id: MongoID!, $name: String!, $mediaUrl: String){
    updateMedia(_id: $id,record: {
            name: $name,
            mediaUrl: $mediaUrl,
        }) {
        recordId
    }
}
`
