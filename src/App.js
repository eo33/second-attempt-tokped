import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ContactList from "./components/ContactList";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://wpe-hiring.tokopedia.net/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <ContactList />
      </div>
    </ApolloProvider>
  );
}

export default App;
