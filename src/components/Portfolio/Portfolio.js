import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>

      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://elwoode.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://elwoode.github.io/russian-travel/" target="_blank" rel="noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://fronted.dumanev.mesto.nomoreparties.sbs/" target="_blank" rel="noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;