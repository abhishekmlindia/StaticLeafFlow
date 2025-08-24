import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { backendUrl } from '../../config/appConfig';
import { getRequest, postRequest } from '../../config/apiConfig';
import { LOGIN_API, COMPANY_TYPE_LIST_API, COMPANY_LIST_ALL_API, COUNTRY_LIST_API, LOYALTY_PROGRAM_LIST_ALL_API, CURRENCY_LIST_API } from '../../config/endPointConfig';
import { getCompanyTypeList, getCompanyList, getCountryList, getProgramList, getCurrencyList } from "../../reduxToolKit/masterDataSlice";

function LoginForm() {

const [fields, setFields] = useState({userName: "", password: ""});
const navigate = useNavigate();
const dispatch = useDispatch();

const handleChange = (event) => {
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    setFields({...fields, [fieldName]: fieldValue});
}

const handleSubmit = async (event) => {
    event.preventDefault();
    // const payload = new URLSearchParams();
    // payload.append("username", fields.userName);
    // payload.append("password", fields.password);
//     const response = await postRequest(backendUrl + LOGIN_API, payload, {
//     "Content-Type": "application/x-www-form-urlencoded"
//   });
 navigate("/search");
const response ={access_token: "abc123"}
    if(response){
        localStorage.setItem("userToken", response.access_token);
        const companyTypeData = await getRequest(backendUrl + COMPANY_TYPE_LIST_API, {}, "get");
        if(companyTypeData && companyTypeData.data)
        dispatch(getCompanyTypeList(companyTypeData.data));
        const companyData = await getRequest(backendUrl + COMPANY_LIST_ALL_API, {}, "get");
        if(companyData && companyData.data)
        dispatch(getCompanyList(companyData.data));
        const countryData = await getRequest(backendUrl + COUNTRY_LIST_API, {}, "get");
        if(countryData && countryData.data)
        dispatch(getCountryList(countryData.data));
        const programData = await getRequest(backendUrl + LOYALTY_PROGRAM_LIST_ALL_API, {}, "get");
        if(programData && programData.data)
        dispatch(getProgramList(programData.data));
        const currencyData = await getRequest(backendUrl + CURRENCY_LIST_API, {}, "get");
        if(currencyData && currencyData.data)
        dispatch(getCurrencyList(currencyData.data));
        navigate("/search");
    }
}

  return (
    <div className="app-container app-theme-white body-tabs-shadow">
            <div className="app-container">
                <div className="h-100 bg-plum-plate bg-animation">
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        <div className="mx-auto app-login-box col-md-8">
                            {/* <div className="app-logo-inverse mx-auto mb-3"></div> */}
                            <div className="mx-auto mb-3"></div>
                            <div className="modal-dialog w-100 mx-auto">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="h5 modal-title text-center">
                                            <h4 className="mt-2">
                                                <div>Welcome back,</div>
                                                <span>Please sign in to your account below.</span>
                                            </h4>
                                        </div>
                                        <form className="">
                                            <div className="">
                                                <div className="col-md-12">
                                                    <div className="position-relative mb-3">
                                                        <input name="userName" id="userName" value={fields.userName} onChange={(event) => handleChange(event)}
                                                            placeholder="Email here..." type="email" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="position-relative mb-3">
                                                        <input name="password" id="password" value={fields.password} onChange={(event) => handleChange(event)}
                                                            placeholder="Password here..." type="password" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="position-relative form-check mb-3">
                                                <input name="check" id="exampleCheck" type="checkbox" className="form-check-input" />
                                                <label htmlFor="exampleCheck" className="form-label form-check-label">Keep me logged in</label>
                                            </div>
                                        </form>
                                        <div className="divider"></div>
                                        <h6 className="mb-0">No account?
                                            <a href="javascript:void(0);" className="text-primary">Sign up now</a>
                                        </h6>
                                    </div>
                                    <div className="modal-footer clearfix">
                                        <div className="float-start">
                                            <a href="javascript:void(0);" className="btn-lg btn btn-link">Recover Password</a>
                                        </div>
                                        <div className="float-end">
                                            <button className="btn btn-primary btn-lg" onClick={handleSubmit}>Login to Dashboard</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-white opacity-8 mt-3">Copyright © CYNC 2025</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default LoginForm;
