import React from 'react'

const MyApp = ({ Component, pageProps }: { Component: React.ComponentType, pageProps: any }) => (
  <Component {...pageProps} />
)

export default MyApp