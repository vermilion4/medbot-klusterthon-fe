import '@/styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimaryHover: '#008FD1',
          defaultBorderColor: '#0098DE',
          defaultColor: '#1A1F21',
        },
       
      },
    }}
  >
  <Component {...pageProps} />
  </ConfigProvider>
  )
}
