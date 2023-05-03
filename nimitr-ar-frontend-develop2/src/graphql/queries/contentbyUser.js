import gql from "graphql-tag";

export default gql`
  query ($project: MongoID, $status: EnumContentContentStatus) {
    contents(filter: { project: $project, contentStatus: $status }) {
      _id
      name
      scale
      rotationX
      rotationY
      rotationZ
      marker{
        _id
        project{
          _id
          name
        }
        name
        type
        markerStatus
        markerType
        markerPattern
        markerUrl
        markerNo
      }
      media {
        _id
        project {
          _id
          name
        }
        type
        mediaUrl
        name
      }
      contentStatus
    }
  }
`;
