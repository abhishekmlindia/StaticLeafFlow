import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

const { t, i18n } = useTranslation();

useEffect(() => {

  }, []);

return <React.Fragment>

    <div className="content-wrapper">
    <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card fusseCard">
                  <div className="card-body text-center">
                    
                    <h2 className="mb-3">Welcome to Test App</h2>
                    <h5>{t('forBusinessOperators')}:</h5> 
                    <p>{t('businessOperatorDetails')}</p>
                    
                    
                    <h5>{t('forITOperators')}:</h5> 
                    <p>{t('itOperatorDetails')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>

    </React.Fragment>

}

export default Home;