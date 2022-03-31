import Header from './Header';
import Footer from './Footer';

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
