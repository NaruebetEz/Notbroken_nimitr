import gql from 'graphql-tag'

export default gql`
mutation ( $project: MongoID!, $name: String!, $content: MongoID,  $type: String, $mediaUrl: String, ){
    createMedia(record: {
            project: $project,
            content: $content,
            name: $name,
            type: $type,
            mediaUrl: $mediaUrl,
        }) {
        recordId
    }
}
`
