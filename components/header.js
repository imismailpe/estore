import styles from './components.module.css';
export const HeaderComp = ()=> {
    return(
        <header>
            <div className={styles.headerSection}>
                <a href="/">E-Store</a>
            </div>
        </header>
    )
}