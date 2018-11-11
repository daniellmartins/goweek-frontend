import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#1da1f2" />
          <link rel="stylesheet" href="/static/normalize.css" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const sheet = new ServerStyleSheet();

//     const originalRenderPage = ctx.renderPage;
//     ctx.renderPage = () =>
//       originalRenderPage({
//         enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
//       });

//     const initialProps = await Document.getInitialProps(ctx);
//     return {
//       ...initialProps,
//       styles: [...initialProps.styles, ...sheet.getStyleElement()]
//     };

//     render() {
//       return (
//         <html>
//           <Head>
//             <style>{`body { margin: 0 } /* custom! */`}</style>
//           </Head>
//           <body className="custom_class">
//             <Main />
//             <NextScript />
//           </body>
//         </html>
//       )
//     }
//   }
// }
