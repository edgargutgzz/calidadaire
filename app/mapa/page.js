import Navbar from '../../components/navbar';
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapa from '../../components/mapa';

export default function Index() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Navbar currentPage="mapa" />
      {/* Mapa */}
      <div className="lg:w-9/12">
        <Mapa />
      </div>
    </div>
  );
}
