import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { formatCount } from '../../utils/helpers';

describe('RepositoryListContainer', () => {
  it("Ensure the repository's name, description, language, fork count, stargazers count, rating average, and review count correctly.", () => {
    const repositories = {
      totalCount: 8,
      pageInfo: {
        hasNextPage: true,
        endCursor:
          'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
          cursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        },
      ],
    };

    render(<RepositoryListContainer repositories={repositories} />)
    const items = screen.getAllByTestId("repositoryItem")

    items.forEach((item, index) => {
      expect(item).toHaveTextContent(new RegExp(repositories.edges[index].node.fullName))
      expect(item).toHaveTextContent(new RegExp(repositories.edges[index].node.description))
      expect(item).toHaveTextContent(new RegExp(repositories.edges[index].node.language))
      expect(item).toHaveTextContent(new RegExp(formatCount(repositories.edges[index].node.forksCount)))
      expect(item).toHaveTextContent(new RegExp(formatCount(repositories.edges[index].node.stargazersCount)))
      expect(item).toHaveTextContent(new RegExp(repositories.edges[index].node.ratingAverage))
      expect(item).toHaveTextContent(new RegExp(formatCount(repositories.edges[index].node.reviewCount)))
    })
  })
})