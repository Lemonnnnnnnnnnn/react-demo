


function MyApp({ Component, pageProps }) {
  return (
    <div style={{ width: '70%', margin : 'auto' }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
