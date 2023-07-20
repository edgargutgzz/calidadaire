import Navbar from '../../components/navbar';
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapa from '../../components/mapa';

export default function Index() {
  return (
    <div>
      <Navbar currentPage="mapa" />
      {/* Mapa */}
      <Mapa />
    </div>
  );
}
