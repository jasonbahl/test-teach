import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Button} from 'antd';
import {QUERY_GET_POSTS, QUERY_FIRST_AMOUNT} from '../ArticleGrid';

export const LoadMoreFragments = {};

LoadMoreFragments.PaginationFields = gql`
fragment PaginationFields on RootPostsConnection {
  pageInfo {
    hasNextPage
    endCursor
  }
} 
`;

class LoadMoreButton extends Component {

    handleClick() {
        const {posts, fetchMore} = this.props;

        fetchMore({
            query: QUERY_GET_POSTS,
            variables: {
                first: QUERY_FIRST_AMOUNT,
                after: posts && posts.pageInfo && posts.pageInfo.endCursor ? posts.pageInfo.endCursor : null
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
                const newEdges = fetchMoreResult.posts.edges;
                const pageInfo = fetchMoreResult.posts.pageInfo;
                console.log(pageInfo);

                return newEdges.length
                    ? {
                        // Put the new comments at the end of the list and update `pageInfo`
                        // so we have the new `endCursor` and `hasNextPage` values
                        posts: {
                            __typename: previousResult.posts.__typename,
                            edges: [...previousResult.posts.edges, ...newEdges],
                            pageInfo
                        }
                    }
                    : previousResult;
            }
        })

    }

    render() {
        return <Button type="primary" onClick={this.handleClick.bind(this)}>Load More</Button>;
    }
}

export default LoadMoreButton;
