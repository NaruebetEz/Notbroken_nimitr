import gql from 'graphql-tag'

export default gql`
mutation (  $id: MongoID! ,$url: String, $imageurl: String){
    updateProject(_id: $id, record: {
            url: $url,
            imageurl: $imageurl,
        }) {
        recordId
    }
}
`
