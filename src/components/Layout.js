import Navigation from "./Navigation";
const Layout = (props) => (
  <>
    <div>
      <Navigation />
      <div>{props.children}</div>
    </div>
  </>
);
export default Layout;
