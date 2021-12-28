import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel='shortcut icon'
                        href='https://www.google.com/s2/favicons?domain=theodorusclarence.com'
                        type='image/png'
                    />
                    <script
                        async
                        defer
                        data-website-id='eb8cf2f7-30f9-4c55-8e48-a0650724820c'
                        src='https://umami.thcl.dev/umami.js'
                        data-domains='nrp.thcl.dev'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
