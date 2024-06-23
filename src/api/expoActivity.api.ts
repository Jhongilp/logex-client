import { gql } from "urql";

export const DefaultExpoActivitiesQuery = gql`
  query GetDefaultExpoActivities {
    defaultExpoActivities: defaultExpoActivities {
      id
      name
      status
      progress
      responsible
      optional
      enabled
    }
  }
`;

export const CreateDefaultExpoActivitiesMutation = gql`
  mutation CreateDefaultExpoActivities($input: CreateDefaultActivitiesInput) {
    defaultActivities: createDefaultActivities(input: $input) {
      id
      name
      status
      progress
      responsible
      optional
      enabled
    }
  }
`;

export const updateDefaultExpoActivityQuery = gql`
  mutation updateDefaultExpoActivity($input: UpdateDefaultActivityInput) {
    updateDefaultExpoActivity(input: $input) {
      id
      name
      status
      progress
      responsible
      optional
      enabled
    }
  }
`;

export const updateTodoExpoActivityMutation = gql`
  mutation updateExpoTodoActivity($input: UpdateTodoExpoActivityInput) {
    updateTodoExpoActivity(input: $input) {
      id
      name
      status
      progress
      responsible
      optional
      enabled
      completedAt
      deadline
      expoId
    }
  }
`;
