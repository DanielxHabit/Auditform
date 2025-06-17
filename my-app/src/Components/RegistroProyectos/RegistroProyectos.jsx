import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [editIdx, setEditIdx] = useState(null);
    const [editProyecto, setEditProyecto] = useState({ nombre: '', descripcion: '', responsable: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
        setProyectos(proyectosGuardados);
    }, []);

    // Eliminar proyecto
    const handleDelete = (idx) => {
        if (window.confirm('¿Seguro que deseas eliminar este proyecto?')) {
            const nuevosProyectos = proyectos.filter((_, i) => i !== idx);
            setProyectos(nuevosProyectos);
            localStorage.setItem('proyectos', JSON.stringify(nuevosProyectos));
            window.dispatchEvent(new Event('storage')); // Notifica actualización
            // Eliminar incidencias asociadas
            localStorage.removeItem(`incidencias_${idx}`);
        }
    };

    // Iniciar edición
    const handleEdit = (idx) => {
        setEditIdx(idx);
        setEditProyecto(proyectos[idx]);
    };

    // Guardar cambios de edición
    const handleEditChange = (e) => {
        setEditProyecto({
            ...editProyecto,
            [e.target.name]: e.target.value
        });
    };

    const handleEditSave = (idx) => {
        const nuevosProyectos = proyectos.map((proy, i) => (i === idx ? editProyecto : proy));
        setProyectos(nuevosProyectos);
        localStorage.setItem('proyectos', JSON.stringify(nuevosProyectos));
        window.dispatchEvent(new Event('storage')); // Notifica actualización
        setEditIdx(null);
    };

    // Cancelar edición
    const handleEditCancel = () => {
        setEditIdx(null);
    };

    // Ir a la página de agregar incidencia
    const handleAgregarIncidencia = (idx) => {
        navigate(`/incidencias/${idx}`);
    };

    // Redirigir a la página de registro de incidencias del proyecto seleccionado
    const handleProyectoClick = (idx) => {
        navigate(`/registro-incidencias/${idx}`);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-orange-200 to-violet-400">
            {/* Menú de navegación superior actualizado */}
            <header className='flex items-center py-6 px-8 md:px-48 bg-white drop-shadow-md'>
                <h1
                    className="text-2xl font-bold mr-8 animate-fade-in-left cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-violet-600"
                    onClick={() => navigate('/Home')}
                >
                    AuditForm
                </h1>
                <nav className="flex-1 flex justify-center">
                    <ul className="flex gap-8">
                        <li
                            className='font-bold transition-transform duration-200 hover:scale-110 hover:text-violet-600 animate-fade-in cursor-pointer'
                            onClick={() => navigate('/crear-proyecto')}
                        >
                            Inicio
                        </li>
                        <li
                            className='font-bold transition-transform duration-200 hover:scale-110 hover:text-violet-600 animate-fade-in cursor-pointer'
                            onClick={() => navigate('/registro-proyectos')}
                        >
                            Registro
                        </li>
                        <li
                            className='font-bold transition-transform duration-200 hover:scale-110 hover:text-violet-600 animate-fade-in cursor-pointer'
                            onClick={() => navigate('/registro-incidencias/0')}
                        >
                            Incidencias
                        </li>
                        <li className='font-bold transition-transform duration-200 hover:scale-110 hover:text-violet-600 animate-fade-in'>
                            <a href="#">Perfil</a>
                        </li>
                    </ul>
                </nav>
                <div className="ml-auto">
                    <a 
                        href="#" 
                        className="font-bold transition-transform duration-200 hover:scale-110 hover:text-red-500 animate-fade-in-right"
                    >
                        Cerrar sesión
                    </a>
                </div>
            </header>
            <main className="flex flex-col items-center min-h-screen">
                <div className="bg-white p-12 rounded-2xl shadow-xl mt-12 w-full max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6">Registro de Proyectos</h1>
                    {proyectos.length === 0 ? (
                        <p className="text-gray-700">No hay proyectos registrados.</p>
                    ) : (
                        <table className="min-w-full border">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Nombre</th>
                                    <th className="px-4 py-2 border-b">Descripción</th>
                                    <th className="px-4 py-2 border-b">Responsable</th>
                                    <th className="px-4 py-2 border-b">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proyectos.map((proyecto, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-violet-100 transition-colors"
                                    >
                                        {editIdx === idx ? (
                                            <>
                                                <td className="px-4 py-2 border-b">
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={editProyecto.nombre}
                                                        onChange={handleEditChange}
                                                        className="w-full px-2 py-1 border rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    <input
                                                        type="text"
                                                        name="descripcion"
                                                        value={editProyecto.descripcion}
                                                        onChange={handleEditChange}
                                                        className="w-full px-2 py-1 border rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    <input
                                                        type="text"
                                                        name="responsable"
                                                        value={editProyecto.responsable}
                                                        onChange={handleEditChange}
                                                        className="w-full px-2 py-1 border rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 border-b flex gap-2">
                                                    <button
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                        onClick={() => handleEditSave(idx)}
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button
                                                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                                        onClick={handleEditCancel}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td
                                                    className="px-4 py-2 border-b cursor-pointer"
                                                    onClick={() => handleProyectoClick(idx)}
                                                >
                                                    {proyecto.nombre}
                                                </td>
                                                <td
                                                    className="px-4 py-2 border-b cursor-pointer"
                                                    onClick={() => handleProyectoClick(idx)}
                                                >
                                                    {proyecto.descripcion}
                                                </td>
                                                <td
                                                    className="px-4 py-2 border-b cursor-pointer"
                                                    onClick={() => handleProyectoClick(idx)}
                                                >
                                                    {proyecto.responsable}
                                                </td>
                                                <td className="px-4 py-2 border-b flex gap-2">
                                                    <button
                                                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                                        onClick={() => handleEdit(idx)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                        onClick={() => handleDelete(idx)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                        onClick={() => handleAgregarIncidencia(idx)}
                                                    >
                                                        Agregar Incidencia
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
            {/* Animaciones personalizadas */}
            <style>
                {`
                .animate-fade-in {
                    animation: fadeIn 0.8s;
                }
                .animate-fade-in-left {
                    animation: fadeInLeft 0.8s;
                }
                .animate-fade-in-right {
                    animation: fadeInRight 0.8s;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-30px);}
                    to { opacity: 1; transform: translateX(0);}
                }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(30px);}
                    to { opacity: 1; transform: translateX(0);}
                }
                `}
            </style>
        </div>
    );
};

export default RegistroProyectos;