import Header from './Header';
import Footer from './Footer';

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <body>
      <Header />
      {children}
      <Footer />
    </body>
  );
}

export default Layout;
