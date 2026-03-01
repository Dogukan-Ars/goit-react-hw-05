import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'
import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState } from 'react';

const Navigation = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    // Menü açıkken scroll kilitle
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <NavLink to="/" className={styles.logoContainer}>
                    <svg className={styles.icon} viewBox="0 0 82 82" xmlns="http://www.w3.org/200/svg">
                        <use href="/src/assets/movieapp_icon.svg#icon" />
                    </svg>

                </NavLink>

                <h1 className={styles.logo}>MovieApp</h1>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav}>
                    <NavLink to="/" className={styles.link}>
                        Home
                    </NavLink>
                    <NavLink to="/movies" className={styles.link}>
                        Movies
                    </NavLink>

                    <button
                        onClick={toggleTheme}
                        className={styles.themeButton}
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </nav>




                {/* Hamburger */}
                <button
                    className={styles.hamburger}
                    onClick={toggleMenu}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${styles.mobileMenu} ${isOpen ? styles.open : ""
                    }`}
            >
                <NavLink
                    to="/"
                    onClick={closeMenu}
                    className={styles.mobileLink}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/movies"
                    onClick={closeMenu}
                    className={styles.mobileLink}
                >
                    Movies
                </NavLink>

                <button
                    onClick={() => {
                        toggleTheme();
                        closeMenu();
                    }}
                    className={styles.mobileTheme}
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </header >
    )
}

export default Navigation