import Navbar from "../Components/Navbar";

export default function LandingPage()
{
    return( 
        <>
        
        <main className="flex-shrink-0">
        {/* <!-- Navigation--> */}
        <Navbar/>
        {/* <!-- Header--> */}
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                  <h1 className="display-5 fw-bolder text-white mb-2">
                  Dern-Support: Your Reliable Tech Partner, Right When You Need Us.
                  </h1>
                  <p className="lead fw-normal text-white-50 mb-4">
                  From on-site business solutions to swift individual repairs, we're here to keep your tech running smoothly.
                  </p>
                  <div
                    className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start"
                  >
                    <a
                      className="btn btn-primary btn-lg px-4 me-sm-3"
                      href="#features"
                      >Get Started</a
                    >
                    <a className="btn btn-outline-light btn-lg px-4" href="#faq"
                      >Learn More</a
                    >
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                <img
                  className="img-fluid rounded-3 my-5"
                  src="LandingImage1.png"
                  alt="An Image for the website"
                />
              </div>
            </div>
          </div>
        </header>
        {/* <!-- Features section--> */}
        <section className="py-5" id="features">
          <div className="container px-5 my-5">
            <div className="row gx-5">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <h2 className="fw-bolder mb-0">Our Core Features</h2>
              </div>
              <div className="col-lg-8">
                <div className="row gx-5 row-cols-1 row-cols-md-2">
                  <div className="col mb-5 h-100">
                    <div
                      className="feature bg-primary bg-gradient text-white rounded-3 mb-3"
                    >
                      <i className="bi bi-collection"></i>
                    </div>
                    <h2 className="h5">On-Site Business Support</h2>
                    <p className="mb-0">
                    Minimize downtime with our expert technicians at your business location.
                    </p>
                  </div>
                  <div className="col mb-5 h-100">
                    <div
                      className="feature bg-primary bg-gradient text-white rounded-3 mb-3"
                    >
                      <i className="bi bi-building"></i>
                    </div>
                    <h2 className="h5">Fast Individual Repairs</h2>
                    <p className="mb-0">
                    Drop-off or courier service for quick and efficient computer fixes.
                    </p>
                  </div>
                  <div className="col mb-5 mb-md-0 h-100">
                    <div
                      className="feature bg-primary bg-gradient text-white rounded-3 mb-3"
                    >
                      <i className="bi bi-toggles2"></i>
                    </div>
                    <h2 className="h5">Comprehensive System Diagnostics</h2>
                    <p className="mb-0">
                    Accurate troubleshooting to pinpoint and resolve any tech issue.
                    </p>
                  </div>
                  <div className="col h-100">
                    <div
                      className="feature bg-primary bg-gradient text-white rounded-3 mb-3"
                    >
                      <i className="bi bi-toggles2"></i>
                    </div>
                    <h2 className="h5">Transparent Service & Communication</h2>
                    <p className="mb-0">
                    Stay informed with clear updates and honest advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Testimonial section--> */}
        <div className="py-5 bg-light">
          <div className="container px-5 my-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-10 col-xl-7">
                <div className="text-center">
                  <div className="fs-4 mb-4 fst-italic">
                  "At Dern-Support, we believe in empowering our clients with reliable technology. We're not just fixing computers; we're building lasting relationships by providing exceptional, personalized support. Our commitment to excellence is the cornerstone of our success."
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      className="rounded-circle me-3"
                      src="profile.jpg"
                      alt="..."
                    />
                    <div className="fw-bold">
                      John Smith
                      <span className="fw-bold text-primary mx-1">/</span>
                      CEO of Dern-Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Not preview section--> */}
        <section className="py-5" id="faq">
          <div className="container px-5 my-5">
            <div className="text-center mb-5">
              <h1 className="fw-bolder">Frequently Asked Questions</h1>
              <p className="lead fw-normal text-muted mb-0">How can we help you?</p>
            </div>
            
            <div className="row gx-5">
              <div className="col-xl-8">
                {/* <!-- FAQ Accordion 1--> */}
                <div className="accordion mb-5" id="accordionExample">
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        What types of businesses do you support?
                      </button>
                    </h3>
                    <div
                      className="accordion-collapse collapse"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                       We support a wide range of businesses, from small startups to medium-sized enterprises, across various industries.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        How quickly can I expect my computer to be repaired?
                      </button>
                    </h3>
                    <div
                      className="accordion-collapse collapse"
                      id="collapseTwo"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                      Repair times vary depending on the issue, but we strive to complete most repairs within 24-48 hours.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Can you help with software issues as well as hardware repairs?
                      </button>
                    </h3>
                    <div
                      className="accordion-collapse collapse"
                      id="collapseThree"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                      Absolutely! Our technicians are skilled in both hardware and software troubleshooting and repair.
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- FAQ Accordion 2--> */}
              </div>
              <div className="col-xl-4">
                <div className="card border-0 bg-light mt-xl-5">
                  <div className="card-body p-4 py-lg-5">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="text-center">
                        <div className="h6 fw-bolder">Have more questions?</div>
                        <p className="text-muted mb-4">
                          Contact us at
                          <br />
                          <a href="#!">Dern@Support.com</a>
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>
      {/* <!-- Footer--> */}
      <footer className="bg-dark py-4 mt-auto">
        <div className="container px-5">
          <div className="row align-items-center justify-content-between flex-column flex-sm-row">
            <div className="col-auto">
              <div className="small m-0 text-white">
                Copyright &copy; Dern Support 2025
              </div>
            </div>
           
          </div>
        </div>
      </footer>
      </>
    )
}