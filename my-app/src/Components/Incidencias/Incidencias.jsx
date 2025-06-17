import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Wizard de registro de incidencia
const pasos = [
    "Información General del Incidente",
    "Evaluación del Incidente",
    "Gestión y Seguimiento"
];

const normativas = ["COBIT", "ISO/IEC 27001", "ISO/IEC 27002", "GDPR", "PCI DSS"];
const impactos = ["Alto", "Medio", "Bajo"];
const prioridades = ["Alta", "Media", "Baja"];
const categoriasTecnicas = ["Seguridad", "Disponibilidad", "Otro"];

const FormularioIncidenciaWizard = ({ onSubmit, incidenciasExistentes = [] }) => {
    const [paso, setPaso] = useState(0);
    const [form, setForm] = useState({
        id: '',
        normativa: '',
        titulo: '',
        fechaDeteccion: '',
        departamento: '',
        origen: '',
        descripcion: '',
        impacto: '',
        prioridad: '',
        categoriaTecnica: '',
        fechaEstimadaResolucion: '',
        responsable: '',
        acciones: '',
        evidencia: '',
        comentarios: '',
        fechaCierre: ''
    });
    const [errorTitulo, setErrorTitulo] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Validar título único en el paso 0
        if (name === "titulo") {
            const existe = incidenciasExistentes.some(
                inc => (inc.titulo || '').trim().toLowerCase() === value.trim().toLowerCase()
            );
            setErrorTitulo(existe ? "Ya existe una incidencia con este título." : "");
        }
    };

    const siguiente = () => setPaso(paso + 1);
    const anterior = () => setPaso(paso - 1);

    const handleSubmit = e => {
        e.preventDefault();
        // Validar título único antes de enviar
        const existe = incidenciasExistentes.some(
            inc => (inc.titulo || '').trim().toLowerCase() === form.titulo.trim().toLowerCase()
        );
        if (existe) {
            setErrorTitulo("Ya existe una incidencia con este título.");
            setPaso(0);
            return;
        }
        if (onSubmit) onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{pasos[paso]}</h2>
            {paso === 0 && (
                <>
                    <div>
                        <label>Normativa relacionada</label>
                        <select name="normativa" value={form.normativa} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required>
                            <option value="">Selecciona</option>
                            {normativas.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Título de la Incidencia</label>
                        <input
                            name="titulo"
                            value={form.titulo}
                            onChange={handleChange}
                            className={`w-full border rounded px-2 py-1 mb-2 ${errorTitulo ? 'border-red-500' : ''}`}
                            required
                        />
                        {errorTitulo && <p className="text-red-600 text-sm mb-2">{errorTitulo}</p>}
                    </div>
                    <div>
                        <label>Fecha de Detección</label>
                        <input type="date" name="fechaDeteccion" value={form.fechaDeteccion} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
                    </div>
                    <div>
                        <label>Departamento Afectado</label>
                        <input name="departamento" value={form.departamento} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
                    </div>
                    <div>
                        <label>Origen del Incidente</label>
                        <input name="origen" value={form.origen} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
                    </div>
                    <div>
                        <label>Descripción del Incidente</label>
                        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
                    </div>
                </>
            )}
            {paso === 1 && (
                <>
                    <div>
                        <label>Impacto</label>
                        <select name="impacto" value={form.impacto} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required>
                            <option value="">Selecciona</option>
                            {impactos.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Prioridad</label>
                        <select name="prioridad" value={form.prioridad} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required>
                            <option value="">Selecciona</option>
                            {prioridades.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Categoría Técnica</label>
                        <select name="categoriaTecnica" value={form.categoriaTecnica} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required>
                            <option value="">Selecciona</option>
                            {categoriasTecnicas.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Fecha Estimada de Resolución</label>
                        <input type="date" name="fechaEstimadaResolucion" value={form.fechaEstimadaResolucion} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" />
                    </div>
                </>
            )}
            {paso === 2 && (
                <>
                    <div>
                        <label>Responsable Asignado</label>
                        <input name="responsable" value={form.responsable} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
                    </div>
                    <div>
                        <label>Acciones Correctivas/Recomendaciones</label>
                        <textarea name="acciones" value={form.acciones} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" />
                    </div>
                    <div>
                        <label>Evidencia Adjunta</label>
                        <input name="evidencia" value={form.evidencia} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" placeholder="Sí / No / Detalles" />
                    </div>
                    <div>
                        <label>Comentarios de Seguimiento</label>
                        <textarea name="comentarios" value={form.comentarios} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" />
                    </div>
                    <div>
                        <label>Fecha de Cierre</label>
                        <input type="date" name="fechaCierre" value={form.fechaCierre} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" />
                    </div>
                </>
            )}
            <div className="flex justify-between mt-6">
                {paso > 0 && (
                    <button type="button" onClick={anterior} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Anterior</button>
                )}
                {paso < 2 ? (
                    <button
                        type="button"
                        onClick={siguiente}
                        className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
                        disabled={paso === 0 && (!form.titulo || !!errorTitulo)}
                    >
                        Siguiente
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        disabled={!!errorTitulo}
                    >
                        Registrar Incidencia
                    </button>
                )}
            </div>
        </form>
    );
};

const Incidencias = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proyecto, setProyecto] = useState(null);
    const [incidencias, setIncidencias] = useState([]);

    useEffect(() => {
        const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
        setProyecto(proyectos[id]);
        const incs = JSON.parse(localStorage.getItem(`incidencias_${id}`)) || [];
        setIncidencias(incs);
    }, [id]);

    const handleRegistrarIncidencia = (nuevaIncidencia) => {
        const incidenciasActuales = JSON.parse(localStorage.getItem(`incidencias_${id}`)) || [];
        // Asignar ID autoincremental
        const nextId = incidenciasActuales.length > 0
            ? Math.max(...incidenciasActuales.map(i => Number(i.id) || 0)) + 1
            : 1;
        const incidenciaFinal = { ...nuevaIncidencia, id: nextId };
        incidenciasActuales.push(incidenciaFinal);
        localStorage.setItem(`incidencias_${id}`, JSON.stringify(incidenciasActuales));
        window.dispatchEvent(new Event('storage'));
        alert('Incidencia registrada correctamente');
        navigate('/Home'); // Redirige al inicio
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-orange-200 to-violet-400">
            {/* Menú de navegación superior */}
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
                            onClick={() => navigate(`/registro-incidencias/${id}`)}
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
            <main className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-12 rounded-2xl shadow-xl mt-12 w-full max-w-3xl">
                    <h1 className="text-3xl font-bold mb-6">Registrar Incidencia</h1>
                    {proyecto && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Proyecto: {proyecto.nombre}</h2>
                            <p className="text-gray-700">{proyecto.descripcion}</p>
                        </div>
                    )}
                    <FormularioIncidenciaWizard
                        onSubmit={handleRegistrarIncidencia}
                        incidenciasExistentes={incidencias}
                    />
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

export default Incidencias;