import { Link } from 'react-router-dom'
import styles from "./NotFoundPage.module.css"

const NotFoundPage = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.code}>404</h1>
            <h2 className={styles.title}>Page Not Found</h2>
            <p className={styles.text}>
                The page you are looking for does not exist.
            </p>

            <Link to="/" className={styles.button}>
                Go to Home
            </Link>
        </div>
    )
}

export default NotFoundPage