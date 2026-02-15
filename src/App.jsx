import styles from './App.module.css'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navigation from './components/Navigation/Navigation'
import Loader from './components/Loader/Loader'


function App() {

  const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
  const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
  const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage/MovieDetailPage'))
  const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
  const MovieReviews = lazy(() =>
    import("./components/MovieReviews/MovieReviews")
  );
  const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

  return (
    <div className={styles.app}>
      <Navigation />

      <main className={styles.main}>

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/movies/:movieId/*' element={<MovieDetailPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} MovieApp | All rights reserved by <a href='https://github.com/Dogukan-Ars' target='_blank'>D.A</a>.
      </footer>
    </div>
  )
}

export default App
