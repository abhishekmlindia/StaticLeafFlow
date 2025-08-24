import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

export default function LoginLayout(props) {
  return (
  <div id="app-layout">
    {props.children}
     <Outlet /> {/* This renders the current page */}
 </div>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
