import React from 'react'
import {Row, Col, Spin} from 'antd'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import ArticleCard, {ArticleCardFragments} from "../ArticleCard";
import LoadMoreButton, {LoadMoreFragments} from '../LoadMoreButton';
import {ArticleCardMetaFragments} from "../ArticleCardMeta";

export const QUERY_GET_POSTS = gql`
query GET_POSTS($first: Int, $after: String, $where: RootPostsQueryArgs) {
  posts(first: $first, after: $after, where: $where) {
    ...PaginationFields  
    edges {
      node {
        ...CardFields
        ...MetaFields
      }
    }
  }
}
${LoadMoreFragments.PaginationFields}
${ArticleCardFragments.CardFields}
${ArticleCardMetaFragments.MetaFields}
`;

export const QUERY_FIRST_AMOUNT = 12;

const ArticleGrid = () => {
    return(
        <Query
            query={QUERY_GET_POSTS}
            fetchPolicy="cache-and-network"
            variables={{
                first: QUERY_FIRST_AMOUNT,
                after: null
            }}
        >
            {({loading, error, fetchMore, data: {posts}}) => {
                if (loading && (!posts || !posts.edges)) return <div style={{textAlign:'center'}}><Spin size="large" /></div>;
                if (error) return `Error! ${error.message}`;

                return (
                    <Row type="flex" justify="space-around">
                        {posts.edges.map(edge => (
                            <Col key={edge.node.id} span={6}>
                                <ArticleCard node={edge.node} {...this.props} />
                            </Col>
                        ))}
                        {posts.pageInfo.hasNextPage ?
                            <LoadMoreButton
                                loading={loading}
                                error={error}
                                posts={posts}
                                fetchMore={fetchMore}
                            /> : null
                        }
                    </Row>
                );
            }}
        </Query>
    )
};

export default ArticleGrid;