import React, {Component} from 'react'
import {Card, Divider} from 'antd'
import gql from 'graphql-tag'
import ArticleCardMeta from '../ArticleCardMeta'

export const ArticleCardFragments = {};

ArticleCardFragments.CardFields = gql`
fragment CardFields on Post {
  id
  title
  link
  featuredImage {
    caption
    sourceUrl
  }
}`;

class ArticleCard extends Component {

    render() {
        const {node} = this.props;
        return (
            <a target="_blank" href={node.link}>
                <Card
                    hoverable
                    style={{margin: '10px'}}
                    cover={node.featuredImage && <img
                        alt={node.featuredImage.caption ? node.featuredImage.caption : null}
                        style={{maxWidth: '100%'}}
                        src={node.featuredImage.sourceUrl ? node.featuredImage.sourceUrl : null}/>}
                >
                    <ArticleCardMeta node={node}/>
                    <Divider dashed/>

                    <h3 dangerouslySetInnerHTML={{__html: node.title}}/>

                </Card>
            </a>
        )
    }

}

export default ArticleCard;