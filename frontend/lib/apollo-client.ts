import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import {RetryLink} from '@apollo/client/link/retry';
import {from} from '@apollo/client';
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';

if (process.env.NODE_ENV !== 'production') {
    loadDevMessages();
    loadErrorMessages();
}

// Retry logic for failed queries
const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: 3000,
        jitter: true
    },
    attempts: {
        max: 3,
        retryIf: (error, _operation) => !!error && error.statusCode !== 400
    }
});

// this is required as the terminating link
const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8080/graphql'
});

const client = new ApolloClient({
    link: from([retryLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    projects: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    }
                }
            },
            Project: {
                fields: {
                    tasks: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    }
                }
            }
        }
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network'
        },
        query: {
            fetchPolicy: 'cache-first'
        }
    }
});

export default client;
