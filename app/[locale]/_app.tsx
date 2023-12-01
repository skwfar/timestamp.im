import { appWithTranslation } from 'next-i18next'
import React from 'react'

const MyApp = ({ Component, pageProps }: { Component: React.ComponentType, pageProps: any }) => (
  <Component {...pageProps} />
)

export default appWithTranslation(MyApp)