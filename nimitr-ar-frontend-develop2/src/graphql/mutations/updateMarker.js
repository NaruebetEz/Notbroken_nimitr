import gql from 'graphql-tag'

export default gql`
mutation ( $id: MongoID!, $name: String! ){
    updateMarker(_id: $id,record: {
            name: $name,
        }) {
        recordId
    }
}
`
