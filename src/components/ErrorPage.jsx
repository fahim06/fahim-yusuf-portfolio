import './ErrorPage.css';

export default function ErrorPage({ type = '404', message = "We can't seem to find the page you're looking for." }) {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="error-page">
      <div className="error-page__content">
        <h1 className="error-page__title">
          <span className="error-page__glitch" data-text={type}>{type}</span>
        </h1>
        <p className="error-page__message">{message}</p>
        <button onClick={goHome} className="error-page__btn">
          RETURN HOME
        </button>
      </div>
    </div>
  );
}
