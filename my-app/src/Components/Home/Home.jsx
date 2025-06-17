import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const estados = ["Abierto", "Asignado", "En proceso", "Cerrado"];
const categoriasTecnicas = ["Seguridad", "Disponibilidad", "Otro"];

const Home = () => {
    const navigate = useNavigate();
    const [incidenciasPorEstado, setIncidenciasPorEstado] = useState([0, 0, 0, 0]);
    const [incidenciasPorCategoria, setIncidenciasPorCategoria] = useState([0, 0, 0]);
    const [proyectos, setProyectos] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

    // Estado para forzar actualización de gráficos
    const [actualizarGraficos, setActualizarGraficos] = useState(false);

    // Escucha cambios en localStorage (de cualquier pestaña/ventana)
    useEffect(() => {
        const onStorage = () => setActualizarGraficos(a => !a);
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    // Llenar los gráficos con datos de todos los proyectos
    useEffect(() => {
        const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
        setProyectos(proyectosGuardados);

        // Si hay uno seleccionado previamente, lo carga; si no, selecciona el último
        const idxGuardado = localStorage.getItem('proyectoSeleccionadoIdx');
        let idx = idxGuardado !== null ? parseInt(idxGuardado, 10) : proyectosGuardados.length - 1;
        if (proyectosGuardados.length === 0) return;
        if (idx < 0 || idx >= proyectosGuardados.length) idx = proyectosGuardados.length - 1;
        setSelectedIdx(idx);
        setProyectoSeleccionado(proyectosGuardados[idx]);

        // --- Recolectar incidencias de TODOS los proyectos ---
        let todasIncidencias = [];
        for (let i = 0; i < proyectosGuardados.length; i++) {
            const incs = JSON.parse(localStorage.getItem(`incidencias_${i}`)) || [];
            todasIncidencias = todasIncidencias.concat(incs);
        }

        // Gráfico de incidencias por estado (ajustado a los nuevos valores)
        const countsEstado = [0, 0, 0, 0];
        todasIncidencias.forEach(inc => {
            const estadoIdx = estados.findIndex(e => (inc.estado || "").toLowerCase() === e.toLowerCase());
            if (estadoIdx !== -1) countsEstado[estadoIdx]++;
        });
        setIncidenciasPorEstado(countsEstado);

        // Gráfico de incidencias por categoría técnica
        const countsCategoria = [0, 0, 0];
        todasIncidencias.forEach(inc => {
            const catIdx = categoriasTecnicas.findIndex(c => (inc.categoriaTecnica || "").toLowerCase() === c.toLowerCase());
            if (catIdx !== -1) countsCategoria[catIdx]++;
        });
        setIncidenciasPorCategoria(countsCategoria);

    }, [actualizarGraficos]);

    // Cuando cambia el proyecto seleccionado, solo cambia la info textual del proyecto
    const handleProyectoChange = (e) => {
        const idx = parseInt(e.target.value, 10);
        setSelectedIdx(idx);
        setProyectoSeleccionado(proyectos[idx]);
        localStorage.setItem('proyectoSeleccionadoIdx', idx);
    };

    // Gráfico de barras para incidencias por estado
    const dataEstado = {
        labels: estados,
        datasets: [
            {
                label: 'Cantidad de Incidencias',
                data: incidenciasPorEstado,
                backgroundColor: [
                    'rgba(239,68,68,0.7)',      // Abierto - rojo
                    'rgba(251,191,36,0.7)',     // Asignado - amarillo
                    'rgba(34,197,94,0.7)',      // En proceso - verde
                    'rgba(156,163,175,0.7)'     // Cerrado - gris
                ],
                borderColor: [
                    'rgba(239,68,68,1)',
                    'rgba(251,191,36,1)',
                    'rgba(34,197,94,1)',
                    'rgba(156,163,175,1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsEstado = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
            }
        }
    };

    // Gráfico de pastel para categoría técnica
    const dataCategoria = {
        labels: categoriasTecnicas,
        datasets: [
            {
                label: 'Categoría Técnica',
                data: incidenciasPorCategoria,
                backgroundColor: [
                    '#6366f1', // Seguridad
                    '#f59e42', // Disponibilidad
                    '#f87171'  // Otro
                ],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const optionsCategoria = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'bottom' },
            tooltip: { enabled: true }
        }
    };

    return (
        <div className='w-full min-h-screen bg-gradient-to-r from-orange-200 to-violet-400'>
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
            <main className="p-8 flex items-center justify-center min-h-screen">
                <div className="bg-white border border-gray-300 rounded-3xl p-16 min-w-[1000px] min-h-[700px] shadow-2xl w-full max-w-7xl">
                    <h2 className="text-4xl font-semibold mb-12">Panel Principal</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Columna 1: Selección de proyecto */}
                        <div className="bg-gray-100 rounded-2xl p-8 h-full flex flex-col items-start">
                            <h3 className="text-2xl font-bold mb-6">Selecciona un Proyecto</h3>
                            <select
                                className="mb-6 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                                value={selectedIdx !== null ? selectedIdx : ''}
                                onChange={handleProyectoChange}
                                disabled={proyectos.length === 0}
                            >
                                {proyectos.length === 0 && (
                                    <option value="">No hay proyectos</option>
                                )}
                                {proyectos.map((proy, idx) => (
                                    <option key={idx} value={idx}>
                                        {proy.nombre}
                                    </option>
                                ))}
                            </select>
                            {proyectoSeleccionado ? (
                                <>
                                    <p className="text-lg font-semibold mb-2">{proyectoSeleccionado.nombre}</p>
                                    <p className="text-gray-700 mb-4">{proyectoSeleccionado.descripcion}</p>
                                    <p className="text-gray-600 text-sm">Responsable: {proyectoSeleccionado.responsable}</p>
                                </>
                            ) : (
                                <p className="text-gray-700">No hay proyectos registrados.</p>
                            )}
                        </div>
                        {/* Columna 2: Gráfico de incidencias por estado */}
                        <div className="bg-gray-100 rounded-2xl p-8 h-full flex flex-col items-center">
                            <h3 className="text-2xl font-bold mb-6">Incidencias por Estado</h3>
                            <div className="w-full max-w-[350px] min-h-[250px] flex items-center">
                                <Bar data={dataEstado} options={optionsEstado} />
                            </div>
                        </div>
                        {/* Columna 3: Gráfico de incidencias por categoría técnica */}
                        <div className="bg-gray-100 rounded-2xl p-8 h-full flex flex-col items-center">
                            <h3 className="text-2xl font-bold mb-6">Incidencias por Categoría Técnica</h3>
                            <div className="w-full max-w-[350px] min-h-[250px] flex items-center">
                                <Pie data={dataCategoria} options={optionsCategoria} />
                            </div>
                        </div>
                    </div>
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

export default Home;
