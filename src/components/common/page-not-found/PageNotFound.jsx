import { Container, Row, Col, Button } from 'react-bootstrap';
// import error from "../../../../public/assets/images/svg/404-error.svg";
function PageNotFound() {


  return (
  
    <div className="maintenance-pages">
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-xl-12 align-self-center">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <div className="text-center">
                <div className="mb-0">
                  <h3 className="fw-semibold text-dark text-capitalize">
                    Oops!, Page Not Found
                  </h3>
                  <p className="text-dark">
                    This pages you are trying to access does not exits or has been
                    moved. <br /> Try going back to our homepage.
                  </p>
                </div>
                <a className="btn btn-primary mt-3 me-1" href="nsso-secured/compile-schedule">
                  Back to Home
                </a>
                <div className="error-page mt-4">
                  <img
                    src={error}
                    className="img-fluid"
                    alt="coming-soon"
                    width="80%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default PageNotFound;
