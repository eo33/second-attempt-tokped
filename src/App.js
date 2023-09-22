import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ContactPage from "./components/ContactPage/ContactPage";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://wpe-hiring.tokopedia.net/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <ContactPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
