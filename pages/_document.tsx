import { Head, Html, Main, NextScript } from "next/document";
import { Toaster } from "@/components/ui/toaster";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <script
          async
          type="text/javascript"
          src="https://app.termly.io/embed.min.js"
          data-auto-block="off"
          data-website-uuid="80da094d-106c-4dec-81a0-7a64f022a8fa"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W3XKNSB');`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:4960538,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        ></script>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
        ></script>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Toaster />
      </body>
    </Html>
  );
}
