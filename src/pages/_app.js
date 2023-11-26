import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
    <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimaryHover: '#008FD1',
          defaultBorderColor: '#0098DE',
          defaultColor: '#1A1F21',
        },
        Tabs: {
          inkBarColor: '#0098DE',
          itemActiveColor: '#0098DE',
          itemSelectedColor: '#0098DE',
          itemHoverColor: '#0098DE',
          itemColor: 'rgba(0, 0, 0, 0.45)'
        },
       
      },
    }}
  >
  <Component {...pageProps} />
  </ConfigProvider>
  </SessionProvider>
  )
}
