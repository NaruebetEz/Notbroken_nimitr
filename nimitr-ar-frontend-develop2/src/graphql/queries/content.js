import { gql } from "@apollo/client";


export default gql`
  query {
    contents {
    _id
    name
    media
    }
  }
`;
