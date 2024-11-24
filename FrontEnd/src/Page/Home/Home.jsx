import "./Home.css";
import { Link } from 'react-router-dom';


export default function Home() {
const Karl = 12;
const Cecilia = 18;

  return (
    <section className='section-home'>
      <div className="container-btn-home">
      <Link to={`Profil/${Karl}`} className='btn-home'>
        Karl
      </Link>
      <Link to={`Profil/${Cecilia}`} className='btn-home'>
        Cecilia
      </Link>
      </div>
    </section>
  );
}
