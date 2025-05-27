import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';

function App() {
  return (
    <Layout>
      <Hero />
      {/* Other sections: About, Services, Projects, Contact will go here */}
    </Layout>
  );
}

export default App;