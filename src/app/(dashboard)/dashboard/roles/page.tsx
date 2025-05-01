"use client";

import { useEffect, useState } from "react";
import { RoleCard } from "@/components/adminComponents/RoleCard";
import { EditRoleModal } from "@/components/adminComponents/EditRoleModal";
import { CreateRoleModal } from "@/components/adminComponents/CreateRoleModal";
import { ConfirmationModal } from "@/components/adminComponents/ConfirmationModal"; 


interface Role {
  _id: string;
  nombre: string;
  descripcion: string;
}

export default function Page() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    
      
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error("Unknown error", err);
        setError("Ocurrió un error desconocido al obtener los roles");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (role: Role) => {
    setSelectedRole(role);
    setIsConfirmDeleteOpen(true);
  };

  const handleEditClick = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRole(null);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRole) return;

    try {
      const res = await fetch(`/api/roles/${selectedRole._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar rol");
      }

      await fetchRoles();
      setIsConfirmDeleteOpen(false);
      setSelectedRole(null);
    } catch (err) {
      console.error("Error al eliminar rol", err);
    }
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
    setSelectedRole(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Cargando roles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">No se encontraron roles disponibles.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Roles del Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((rol, index) => (
          <RoleCard
            key={rol._id}
            nombre={rol.nombre}
            descripcion={rol.descripcion}
            delay={index * 0.1}
            onEdit={() => handleEditClick(rol)}
            onDelete={() => handleDeleteClick(rol)}
          />
        ))}

        {/* Card especial para crear nuevo rol */}
        <RoleCard
          nombre="Crear nuevo rol"
          descripcion="Agregar un nuevo rol al sistema."
          delay={roles.length * 0.1}
          isCreateCard
          onCreate={handleCreateClick}
        />
      </div>

      {/* Modal de Edición */}
      {selectedRole && (
        <EditRoleModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          roleId={selectedRole._id}
          initialRoleName={selectedRole.nombre}
          initialRoleDescription={selectedRole.descripcion}
          onSuccess={fetchRoles}
        />
      )}

      {/* Modal de Creación */}
      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSuccess={fetchRoles}
      />

      {/* Modal de Confirmar Eliminación */}
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={handleCloseConfirmDelete}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar rol?"
        description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar este rol?"
      />
    </div>
  );}