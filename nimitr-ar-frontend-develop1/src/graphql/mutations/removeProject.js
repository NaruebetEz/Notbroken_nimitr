import gql from 'graphql-tag'

export default gql`
mutation (
    $_id: MongoID!
    $status: EnumProjectProjectStatus
    ){
    updateProject(_id:$_id,
    record:{
        projectStatus: $status,
    })
    {
        recordId
    }
}
`