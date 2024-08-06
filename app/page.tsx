"use client";

import Head from 'next/head';
import ImageGallery from './components/ImageGallery';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Image Gallery</title>
        <meta name="description" content="Image gallery application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Image Gallery</h1>
        <ImageGallery />
      </main>
    </div>
  );
};

export default Home;