'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

type DailyLog = {
  _id: string;
  fecha: string;
  tareas: Tarea[];
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, y: -30, scale: 0.9 },
};

const EditDailyLogForm = ({
  dailyLog,
  proyectos,
  onClose,
  onUpdated,
}: {
  dailyLog: DailyLog;
  proyectos: Proyecto[];
  onClose: () => void;
  onUpdated: () => void;
}) => {
  const [fecha, setFecha] = useState(dailyLog.fecha);
  const [tareas, setTareas] = useState<Tarea[]>([...dailyLog.tareas]);
  const [visible, setVisible] = useState(true);

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
      const res = await fetch(`/api/dailylogs/${dailyLog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha, tareas }),
      });
      if (!res.ok) throw new Error('Error al actualizar el registro');
      toast.success('Registro diario actualizado correctamente.');
      onUpdated();
      setVisible(false); // Oculta con animación
    } catch (err) {
      console.error(err);
      toast.error('Error al actualizar el registro.');
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // Solo cerramos realmente cuando terminó la animación de salida
        onClose();
      }}
    >
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          <motion.div
            className="relative bg-white/90 backdrop-brightness-105 backdrop-saturate-150 p-6 rounded-xl shadow-xl w-full max-w-3xl overflow-y-auto max-h-[90vh]"
            variants={modalVariants}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-700 hover:text-black text-xl font-bold"
              title="Cerrar"
            >
              ✖
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">Editar Registro Diario</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block mb-1 font-medium">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
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
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Actividad"
                      value={tarea.activity}
                      onChange={(e) => handleTareaChange(index, 'activity', e.target.value)}
                      className="border p-2 rounded"
                      required
                    />
                    <select
                      value={tarea.project}
                      onChange={(e) => handleTareaChange(index, 'project', e.target.value)}
                      className="border p-2 rounded"
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
                Actualizar
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditDailyLogForm;
