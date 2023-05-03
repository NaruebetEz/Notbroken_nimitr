import gql from 'graphql-tag'

export default gql`
mutation ( $name: String!, $markerPattern: String, $markerUrl: String, $markerType:String, $markerNo:String){
    createMarker(record: {
            name: $name,
            markerUrl: $markerUrl,
            markerPattern: $markerPattern,
            markerType: $markerType
            markerNo: $markerNo
        }) {
        recordId
    }
}
`
