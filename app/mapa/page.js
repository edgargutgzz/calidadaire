import Navbar from '../../components/navbar';
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapa from '../../components/mapa';

export default function Index() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Navbar currentPage="mapa" />
      {/* Mapa */}
      <div className="lg:flex-grow lg:w-[80.6%]">
        <Mapa />
      </div>
    </div>
  );
}
