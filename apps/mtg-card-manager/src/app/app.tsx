// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import CardManager from './card-manager/card-manager';

export function App() {
  return (
    <div className={styles['app']}>
      <CardManager />
    </div>
  );
}

export default App;
