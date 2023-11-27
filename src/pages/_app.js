import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";
import { ReduxProvider } from "@/store/ReduxProvider";
import { RecommendationProvider } from "@/context/reportContext";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ReduxProvider>
      <SessionProvider session={pageProps.session}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimaryHover: "#008FD1",
                defaultBorderColor: "#0098DE",
                defaultColor: "#1A1F21",
                defaultHoverColor: "#0098DE",
                defaultHoverBorderColor: "#0098DE",
               
              },
              Tabs: {
                inkBarColor: "#0098DE",
                itemActiveColor: "#0098DE",
                itemSelectedColor: "#0098DE",
                itemHoverColor: "#0098DE",
                itemColor: "rgba(0, 0, 0, 0.45)",
              },
            },
          }}
        >
          <RecommendationProvider>
          <Component {...pageProps} />
          </RecommendationProvider>
        </ConfigProvider>
      </SessionProvider>
    </ReduxProvider>
  );
}
