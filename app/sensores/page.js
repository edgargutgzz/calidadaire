import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: sensores } = await supabase.from("sensores").select();

  return (
    <table className="table-auto mx-auto w-1/2">
      <thead>
        <tr>
          <th className="px-4 py-2">Sensor ID</th>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Municipio</th>
          <th className="px-4 py-2">Lat</th>
          <th className="px-4 py-2">Lon</th>
        </tr>
      </thead>
      <tbody>
        {sensores?.map((sensor) => (
          <tr key={sensor.id}>
            <td className="border px-4 py-2">{sensor.sensor_id}</td>
            <td className="border px-4 py-2">{sensor.nombre}</td>
            <td className="border px-4 py-2">{sensor.municipio}</td>
            <td className="border px-4 py-2">{sensor.lat}</td>
            <td className="border px-4 py-2">{sensor.lon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}






