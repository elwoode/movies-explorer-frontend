import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory, withRouter, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { severError, registerUserSuccessful, registerUserError, authError } from '../../utils/constans';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Popup from '../Popup/Popup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import Index from '../ScrollUpButton/scrollUpButton';
import MainApi from '../../utils/MainApi';
import Token from '../../utils/token';

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const history = useHistory();


  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    MainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(severError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onRegister(formData) {
    MainApi.registerUser(formData)
      .then((res) => {
        if (res._id) {
          setPopupTitle(registerUserSuccessful);
          setIsOpenPopup(true);
          onLogin(formData);
        }
      })
      .catch((err) => {
        setPopupTitle(registerUserError);
        setIsOpenPopup(true);
      });
  }

  function onLogin(formData) {
    MainApi.loginUser(formData)
      .then(({ token }) => {
        if (token) {
          Token.saveToken(token);
          MainApi.updateToken();
          setLoggedIn(true);
          getUserInfo();
          history.push('/movies');
        }
      })
      .catch((err) => {
        setPopupTitle(authError);
        setIsOpenPopup(true);
      });
  }

  function openPopup(textError) {
    setPopupTitle(textError);
    setIsOpenPopup(true);
  }

  function closePopup() {
    setIsOpenPopup(false);
    setPopupTitle('');
  }

  useEffect(() => {
    if (setIsOpenPopup) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closePopup();
        }
      }

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isOpenPopup]);

  function onSignOut() {
    Token.removeToken();
    setLoggedIn(false);
    localStorage.removeItem('films');
    localStorage.removeItem('filmsTumbler');
    localStorage.removeItem('filmsInputSearch');
    localStorage.removeItem('savedFilms');
    localStorage.removeItem('savedFilmsTumbler');
    localStorage.removeItem('savedFilmsInputSearch');
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ?
          <Header loggedIn={loggedIn} isLoading={isLoading} /> : ''}

        <Switch>
          <Route exact path="/">
            <Main />

          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            isLoading={isLoading}
            openPopup={openPopup}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            isLoading={isLoading}
            openPopup={openPopup}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            isLoading={isLoading}
            onSignOut={onSignOut}
            openPopup={openPopup}
          />
          <Route path="/signin">
            {() =>
              isLoading ? <Preloader /> : !loggedIn ? <Login onLogin={onLogin} /> : <Redirect to="/movies" />
            }
          </Route>

          <Route path="/signup">
            {() =>
              isLoading ? (
                <Preloader />
              ) : !loggedIn ? (
                <Register onRegister={onRegister} />
              ) : (
                <Redirect to="/movies" />
              )
            }
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <Index />
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}

        <Popup text={popupTitle} isOpen={isOpenPopup} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);