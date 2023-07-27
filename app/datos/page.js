"use client";

import { useState } from 'react';
import Navbar from '../../components/navbar';

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar currentPage="datos" />
      <div className="mx-4 mb-2 pt-4">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div onClick={toggleOpen} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p>¿Por qué utilizar esta app sobre las otras?</p>
            <img 
              src={isOpen ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-4 w-4" 
            />
          </div>
          {isOpen && (
            <p className="mt-2 text-sm">
              Esta app es la única que te permite saber si puedes salir a correr o andar en bici, si puedes llevar a tus hijos o a tus padres a un parque, o si puedes hacer un picnic en el parque. Todo esto basado en la calidad del aire en tu ciudad.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}










