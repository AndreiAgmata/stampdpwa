import "@/app/styles/account/my-account.scss";

function loading() {
  return (
    <section
      className="my-account-section d-flex flex-column justify-content-center align-items-center"
      style={{ paddingBottom: "6rem" }}
    >
      <div
        className="spinner-border mb-3"
        role="status"
        style={{ color: "#6e72fc", width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <h1 className="dark">Loading Account Details</h1>
    </section>
  );
}

export default loading;
