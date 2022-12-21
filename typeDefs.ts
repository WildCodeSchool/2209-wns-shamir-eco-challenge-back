import { gql } from "apollo-server";

export default gql`
  type Challenge {
    name: String
    gesture: [Gesture]
  }
  type Gesture {
    name: String
  }
  type Query {
    getAllChallenge: [Challenge]
  }
  type Query {
    getAllGesture: [Gesture]
  }
  type Mutation {
    createChallenge(name: String): Challenge
  }
  type Mutation {
    createGesture(name: String): Gesture
}
`;