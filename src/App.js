import React, {Component} from 'react';
import {Row, Col, Card, Divider, Spin, Avatar, Button} from 'antd';
import AppLayout from './components/AppLayout';
import {ApolloProvider} from 'react-apollo';
import {client} from './state';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Moment from 'react-moment';

const {Meta} = Card;

const QUERY_GET_POSTS = gql`
query GET_POSTS($first: Int $after: String) {
  posts(first: $first after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        link
        featuredImage {
          caption
          sourceUrl
        }
        date
        authors {
          nodes {
            firstName
            lastName
          }
        }
      }
    }
  }
}
`;

export const QUERY_FIRST_AMOUNT = 12;

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <AppLayout>
                    <Query
                        query={QUERY_GET_POSTS}
                        fetchPolicy="cache-and-network"
                        variables={{
                            first: QUERY_FIRST_AMOUNT,
                            after: null
                        }}
                    >
                        {({loading, error, fetchMore, data: {posts}}) => {
                            if (loading && (!posts || !posts.edges)) return <div
                                style={{textAlign: 'center'}}><Spin size="large"/></div>;
                            if (error) return `Error! ${error.message}`;

                            return (
                                <Row type="flex" justify="space-around">
                                    {posts.edges.map(edge => (
                                        <Col key={edge.node.id} span={6}>
                                            <a target="_blank" href={edge.node.link}>
                                                <Card
                                                    hoverable
                                                    style={{margin: '10px'}}
                                                    cover={edge.node.featuredImage && <img
                                                        alt={edge.node.featuredImage.caption ? edge.node.featuredImage.caption : null}
                                                        style={{maxWidth: '100%'}}
                                                        src={edge.node.featuredImage.sourceUrl ? edge.node.featuredImage.sourceUrl : null}/>}
                                                >
                                                    <Meta
                                                        avatar={<Avatar
                                                            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'/>}
                                                        title={edge.node.authors.nodes[0].firstName + ' ' + edge.node.authors.nodes[0].lastName}
                                                        description={<Moment
                                                            format="MMM DD, YYYY">{edge.node.date}</Moment>}
                                                    />
                                                    <Divider dashed/>

                                                    <h3 dangerouslySetInnerHTML={{__html: edge.node.title}}/>
                                                </Card>
                                            </a>
                                        </Col>
                                    ))}
                                    {posts.pageInfo.hasNextPage ?
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                fetchMore({
                                                    query: QUERY_GET_POSTS,
                                                    variables: {
                                                        first: QUERY_FIRST_AMOUNT,
                                                        after: posts && posts.pageInfo && posts.pageInfo.endCursor ? posts.pageInfo.endCursor : null
                                                    },
                                                    updateQuery: (previousResult, {fetchMoreResult}) => {
                                                        const newEdges = fetchMoreResult.posts.edges;
                                                        const pageInfo = fetchMoreResult.posts.pageInfo;
                                                        return newEdges.length ? {
                                                            posts: {
                                                                __typename: previousResult.posts.__typename,
                                                                edges: [...previousResult.posts.edges, ...newEdges],
                                                                pageInfo
                                                            }
                                                        } : previousResult
                                                    }
                                                })
                                            }}>Load More</Button> : null
                                    }
                                </Row>
                            );
                        }}
                    </Query>
                </ AppLayout>
            </ApolloProvider>
        );
    }
}

export default App

