import React, {Component} from 'react';
import AppLayout from './components/AppLayout'
import ArticleGrid from './components/ArticleGrid'
import { ApolloProvider } from 'react-apollo';
import { client } from './state';

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <AppLayout>
                    <ArticleGrid {...this.props} />
                </AppLayout>
            </ApolloProvider>
        );
    }
}

export default App;
