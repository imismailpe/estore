import styles from './components.module.css';
import Profile from './header/Profile';
export const HeaderComp = ()=> {
    return(
        <header>
            <div className={styles.headerSection}>
                <a href="/">E-Store</a>
                <Profile />
            </div>
        </header>
    )
}