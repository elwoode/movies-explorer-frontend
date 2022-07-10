import './AboutMe.css';
import avatar from '../../images/avarar.jpg';

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__header">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Виктор</h3>
          <p className="about-me__job">Фронтенд-разработчик, 32 года</p>
          <p className="about-me__description">
            Я родился в Сургуте живу в Санкт-Петербурге . Люблю гулять на природе
            с женой и с нашей собакой Луной. Летом часто ездим на Ладожское озеро
            Работал электриком.Прошёл курс по веб&#8209;разработке от Яндекс.Практикум.
          </p>

          <ul className="about-me__links">
            <li><a className="about-me__link" href="https://vk.com/elwoode" target="_blank" rel="noreferrer">Vkontakte</a></li>
            <li><a className="about-me__link" href="https://github.com/elwoode" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>

        <img src={avatar} alt="about-me" className="about-me__image" />
      </div>
    </section>
  );
};

export default AboutMe;