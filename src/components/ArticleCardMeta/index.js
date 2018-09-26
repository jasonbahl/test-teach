import React, {Component} from 'react'
import {Avatar, Card} from 'antd'
import Moment from 'react-moment'
import gql from 'graphql-tag';

const {Meta} = Card;

export const ArticleCardMetaFragments = {};

ArticleCardMetaFragments.MetaFields = gql`
fragment MetaFields on Post {
  date
  authors {
    nodes {
      firstName
      lastName
    }
  }
}
`;

/**
 * - date
 * - author
 *   - firstName
 *   - lastName
 *   - avatar
 *     - sourceUrl
 */
class ArticleCardMeta extends Component {
    render() {
        const {node} = this.props;
        return (
            <Meta
                avatar={<Avatar
                    src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'/>}
                title={node.authors.nodes[0].firstName + ' ' + node.authors.nodes[0].lastName}
                description={<Moment format="MMM DD, YYYY">{node.date}</Moment>}
            />
        );
    }

}

export default ArticleCardMeta;
