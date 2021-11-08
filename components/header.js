export default function Header({ search, setSearch}) {
 // using setSearch prop we dynamically set the search variable on change of the input(search-as-you-type)
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Songs</h1>
          <p className="lead text-muted">Songs are what move us</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              setSearch(e.target.value || '');
            }}>
            <div className="input-group">
              <input
                value={search}
                onChange={e => {
                  e.preventDefault();
                  setSearch(e.target.value)}}
                type="text"
                className="form-control"
                placeholder="Type a song name, e.g. Slow Dance"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
