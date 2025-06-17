import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearProyecto.css';

const CrearProyecto = () => {
    const navigate = useNavigate();
    const [proyecto, setProyecto] = useState({
        nombre: '',
        descripcion: '',
        responsable: ''
    });

    // Guardar proyectos en localStorage
    const handleSubmit = (e) => {
        e.preventDefault();
        const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
        proyectosGuardados.push(proyecto);
        localStorage.setItem('proyectos', JSON.stringify(proyectosGuardados));
        setProyecto({ nombre: '', descripcion: '', responsable: '' });
        alert('¡Proyecto creado exitosamente!');
        // navigate('/Home'); // Descomenta si quieres redirigir
    };

    const handleChange = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
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
            {/* Contenido principal */}
            <main className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-12 rounded-2xl shadow-xl mt-12 w-full max-w-lg">
                    <h1 className="text-3xl font-bold mb-6">Crear Proyecto</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Nombre del Proyecto</label>
                            <input
                                type="text"
                                name="nombre"
                                value={proyecto.nombre}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={proyecto.descripcion}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Responsable</label>
                            <input
                                type="text"
                                name="responsable"
                                value={proyecto.responsable}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 bg-violet-500 text-white font-bold py-2 rounded-lg hover:bg-violet-600 transition-colors"
                        >
                            Crear
                        </button>
                    </form>
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

export default CrearProyecto;