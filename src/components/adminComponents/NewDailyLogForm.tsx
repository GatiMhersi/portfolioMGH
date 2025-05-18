'use client';

import { DailyLogType } from '@/types/DailyLog';
import { useState } from 'react';
import { toast } from 'sonner';


type Tarea = {
  time: string;
  activity: string;
  project: string;
};

type Proyecto = {
  _id: string;
  titulo: string;
};

const NewDailyLogForm = ({ proyectos,onCreated  }: { proyectos: Proyecto[]; onCreated?: (newLog: DailyLogType) => void; }) => {
  const [fecha, setFecha] = useState('');
  const [tareas, setTareas] = useState<Tarea[]>([{ time: '', activity: '', project: '' }]);

  const handleTareaChange = (index: number, field: keyof Tarea, value: string) => {
    const updated = [...tareas];
    updated[index][field] = value;
    setTareas(updated);
  };

  const addTarea = () => {
    setTareas([...tareas, { time: '', activity: '', project: '' }]);
  };

  const removeTarea = (index: number) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/dailylogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha, tareas }),
      });
      if (!res.ok) throw new Error('Error al crear el registro');
      const nuevoLog = await res.json();
      toast.success('Registro diario creado exitosamente!');

      setFecha('');
      setTareas([{ time: '', activity: '', project: '' }]);

      if (onCreated) onCreated(nuevoLog);
    } catch (err) {
      console.error(err);
      toast.error('Ocurrió un error al enviar los datos.');

    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow space-y-4 text-sm">
      <div>
        <label className="block mb-1 font-medium">Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full border p-1 rounded"
          required
        />
      </div>

      <div className="space-y-3">
        {tareas.map((tarea, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr_2fr_auto] gap-2 items-center"
          >
            <input
              type="time"
              value={tarea.time}
              onChange={(e) => handleTareaChange(index, 'time', e.target.value)}
              className="border p-1 rounded"
              required
            />
            <input
              type="text"
              placeholder="Actividad"
              value={tarea.activity}
              onChange={(e) => handleTareaChange(index, 'activity', e.target.value)}
              className="border p-1 rounded"
              required
            />
            <select
              value={tarea.project}
              onChange={(e) => handleTareaChange(index, 'project', e.target.value)}
              className="border p-1 rounded"
              required
            >
              <option value="">Proyecto</option>
              {proyectos.map((proyecto) => (
                <option key={proyecto._id} value={proyecto._id}>
                  {proyecto.titulo}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeTarea(index)}
              className="text-red-600 text-lg px-2 hover:scale-110"
              title="Eliminar tarea"
            >
              🗑️
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTarea}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Agregar Tarea
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Guardar
      </button>
    </form>
  );
};

export default NewDailyLogForm;
