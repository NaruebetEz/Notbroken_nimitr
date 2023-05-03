import gql from "graphql-tag";

export default gql`
  query ($user: MongoID, $status: EnumProjectProjectStatus) {
    projects(filter: { user: $user, projectStatus: $status }) {
      _id
      name
      url
      imageurl
      projectStatus
    }
  }
`;
