import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// --- Wizard Step Data ---
const pasos = [
    "Información General del Incidente",
    "Evaluación del Incidente",
    "Gestión y Seguimiento"
];

const normativas = ["COBIT", "ISO/IEC 27001", "ISO/IEC 27002", "GDPR", "PCI DSS"];
const impactos = ["Alto", "Medio", "Bajo"];
const prioridades = ["Alta", "Media", "Baja"];
const categoriasTecnicas = ["Seguridad", "Disponibilidad", "Otro"];
const estados = ["Abierto", "Asignado", "En proceso", "Cerrado"];

const FormularioIncidenciaWizard = ({ onSubmit, initialData, onCancel }) => {
    const [paso, setPaso] = useState(0);
    const [form, setForm] = useState(
        initialData || {
            id: '',
            normativa: '',
            tipoAuditoria: '',
            fechaDeteccion: '',
            detectadoPor: '',
            departamento: '',
            origen: '',
            descripcion: '',
            impacto: '',
            prioridad: '',
            categoriaTecnica: '',
            estado: '',
            fechaEstimadaResolucion: '',
            responsable: '',
            acciones: '',
            evidencia: '',
            comentarios: '',
            fechaCierre: ''
        }
    );

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const siguiente = () => setPaso(paso + 1);
    const anterior = () => setPaso(paso - 1);

    const handleSubmit = e => {
        e.preventDefault();
        if (onSubmit) onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-6">{pasos[paso]}</h2>
            {paso === 0 && (
                <>
                    <div>
                        <label>ID del Incidente</label>
                        <input name="id" value={form.id} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
                    </div>
                    <div>
                        <label>Normativa relacionada</label>
                        <select name="normativa" value={form.normativa} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required>
                            <option value="">Selecciona</option>
                            {normativas.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Tipo de Auditoría</label>
                        <input name="tipoAuditoria" value={form.tipoAuditoria} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
                    </div>
                    <div>
                        <label>Fecha de Detección</label>
                        <input type="date" name="fechaDeteccion" value={form.fechaDeteccion} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
                    </div>
                    <div>
                        <label>Detectado por</label>
                        <input name="detectadoPor" value={form.detectadoPor} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required />
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
                        <label>Estado</label>
                        <select name="estado" value={form.estado} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-2" required>
                            <option value="">Selecciona</option>
                            {estados.map(e => <option key={e} value={e}>{e}</option>)}
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
                    <button type="button" onClick={siguiente} className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700">Siguiente</button>
                ) : (
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Guardar</button>
                        {onCancel && (
                            <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancelar</button>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
};

const RegistroIncidencias = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proyecto, setProyecto] = useState(null);
    const [incidencias, setIncidencias] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [editIdx, setEditIdx] = useState(null);

    useEffect(() => {
        const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
        setProyecto(proyectos[id]);
        const incs = JSON.parse(localStorage.getItem(`incidencias_${id}`)) || [];
        setIncidencias(incs);
    }, [id]);

    // Agregar nueva incidencia
    const handleRegistrarIncidencia = (nuevaIncidencia) => {
        const nuevasIncidencias = [...incidencias, nuevaIncidencia];
        setIncidencias(nuevasIncidencias);
        localStorage.setItem(`incidencias_${id}`, JSON.stringify(nuevasIncidencias));
        window.dispatchEvent(new Event('storage'));
        setShowAdd(false);
    };

    // Editar incidencia
    const handleEditIncidencia = (incidenciaEditada) => {
        const nuevasIncidencias = incidencias.map((inc, idx) =>
            idx === editIdx ? incidenciaEditada : inc
        );
        setIncidencias(nuevasIncidencias);
        localStorage.setItem(`incidencias_${id}`, JSON.stringify(nuevasIncidencias));
        window.dispatchEvent(new Event('storage'));
        setEditIdx(null);
    };

    // Eliminar incidencia
    const handleDelete = (idx) => {
        if (window.confirm('¿Seguro que deseas eliminar esta incidencia?')) {
            const nuevasIncidencias = incidencias.filter((_, i) => i !== idx);
            setIncidencias(nuevasIncidencias);
            localStorage.setItem(`incidencias_${id}`, JSON.stringify(nuevasIncidencias));
            window.dispatchEvent(new Event('storage'));
        }
    };

    // Exportar a Excel (todos los campos)
    const exportarExcel = () => {
        if (!incidencias.length) return;
        const ws = XLSX.utils.json_to_sheet(incidencias);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Incidencias");
        XLSX.writeFile(wb, `incidencias_${proyecto?.nombre || id}.xlsx`);
    };

    // Exportar a PDF (solo 7 campos importantes)
    const exportarPDF = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
        doc.setFontSize(16);
        doc.text(`Incidencias del Proyecto: ${proyecto?.nombre || ''}`, 20, 30);

        const columns = [
            { header: "ID", dataKey: "id" },
            { header: "Normativa", dataKey: "normativa" },
            { header: "Tipo Auditoría", dataKey: "tipoAuditoria" },
            { header: "Impacto", dataKey: "impacto" },
            { header: "Estado", dataKey: "estado" },
            { header: "Prioridad", dataKey: "prioridad" },
            { header: "Responsable", dataKey: "responsable" }
        ];

        doc.autoTable({
            columns,
            body: incidencias,
            startY: 50,
            styles: {
                fontSize: 8,
                cellWidth: 'wrap',
                overflow: 'linebreak'
            },
            headStyles: { fillColor: [139, 92, 246] },
            margin: { left: 10, right: 10 }
        });

        doc.save(`incidencias_${proyecto?.nombre || id}.pdf`);
    };

    // Exportar a PDF solo con la parte de Gestión y Seguimiento + ID
    const exportarGestionPDF = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
        doc.setFontSize(16);
        doc.text(`Gestión y Seguimiento - Proyecto: ${proyecto?.nombre || ''}`, 20, 30);

        const columns = [
            { header: "ID", dataKey: "id" },
            { header: "Responsable", dataKey: "responsable" },
            { header: "Acciones/Recomendaciones", dataKey: "acciones" },
            { header: "Comentarios", dataKey: "comentarios" },
            { header: "Fecha de Cierre", dataKey: "fechaCierre" }
        ];

        doc.autoTable({
            columns,
            body: incidencias,
            startY: 50,
            styles: {
                fontSize: 8,
                cellWidth: 'wrap',
                overflow: 'linebreak'
            },
            headStyles: { fillColor: [139, 92, 246] },
            margin: { left: 10, right: 10 }
        });

        doc.save(`gestion_seguimiento_${proyecto?.nombre || id}.pdf`);
    };

    // Función para obtener el color de fondo según el estado de la incidencia
    const getRowColor = (estado) => {
        switch ((estado || "").toLowerCase()) {
            case "abierto":
                return "bg-red-100";
            case "asignado":
                return "bg-yellow-100";
            case "en proceso":
                return "bg-blue-100";
            case "cerrado":
                return "bg-green-100";
            default:
                return "";
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-orange-200 to-violet-400">
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
            <main className="flex flex-col items-center min-h-screen">
                <div className="bg-white p-12 rounded-2xl shadow-xl mt-12 w-full max-w-4xl">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-3xl font-bold">Incidencias del Proyecto</h1>
                        <div className="flex gap-4 flex-wrap">
                            <button
                                className="bg-violet-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-violet-700 transition"
                                onClick={() => { setShowAdd(true); setEditIdx(null); }}
                            >
                                Agregar Incidencia
                            </button>
                            <button
                                className="bg-green-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-800 transition"
                                onClick={exportarExcel}
                                disabled={incidencias.length === 0}
                                title={incidencias.length === 0 ? "No hay incidencias para exportar" : ""}
                            >
                                Exportar Excel
                            </button>
                            <button
                                className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition"
                                onClick={exportarPDF}
                                disabled={incidencias.length === 0}
                                title={incidencias.length === 0 ? "No hay incidencias para exportar" : ""}
                            >
                                Exportar PDF
                            </button>
                            <button
                                className="bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-800 transition"
                                onClick={exportarGestionPDF}
                                disabled={incidencias.length === 0}
                                title={incidencias.length === 0 ? "No hay incidencias para exportar" : ""}
                            >
                                Exportar Gestión y seguimiento
                            </button>
                        </div>
                    </div>
                    {proyecto && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Proyecto: {proyecto.nombre}</h2>
                            <p className="text-gray-700">{proyecto.descripcion}</p>
                        </div>
                    )}
                    {/* Solo muestra el formulario si se va a agregar o editar */}
                    {showAdd && (
                        <FormularioIncidenciaWizard
                            onSubmit={nueva => {
                                const nuevasIncidencias = [...incidencias, nueva];
                                setIncidencias(nuevasIncidencias);
                                localStorage.setItem(`incidencias_${id}`, JSON.stringify(nuevasIncidencias));
                                window.dispatchEvent(new Event('storage'));
                                setShowAdd(false);
                            }}
                            onCancel={() => setShowAdd(false)}
                        />
                    )}
                    {editIdx !== null && (
                        <FormularioIncidenciaWizard
                            onSubmit={incidenciaEditada => {
                                const nuevasIncidencias = incidencias.map((inc, idx) =>
                                    idx === editIdx ? incidenciaEditada : inc
                                );
                                setIncidencias(nuevasIncidencias);
                                localStorage.setItem(`incidencias_${id}`, JSON.stringify(nuevasIncidencias));
                                window.dispatchEvent(new Event('storage'));
                                setEditIdx(null);
                            }}
                            initialData={incidencias[editIdx]}
                            onCancel={() => setEditIdx(null)}
                        />
                    )}
                    {/* Tabla CRUD */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">ID</th>
                                    <th className="px-4 py-2 border-b">Normativa</th>
                                    <th className="px-4 py-2 border-b">Tipo Auditoría</th>
                                    <th className="px-4 py-2 border-b">Impacto</th>
                                    <th className="px-4 py-2 border-b">Estado</th>
                                    <th className="px-4 py-2 border-b">Prioridad</th>
                                    <th className="px-4 py-2 border-b">Responsable</th>
                                    <th className="px-4 py-2 border-b">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incidencias.map((inc, idx) => (
                                    <tr key={idx} className={`hover:bg-violet-100 ${getRowColor(inc.estado)}`}>
                                        <td className="px-4 py-2 border-b">{inc.id}</td>
                                        <td className="px-4 py-2 border-b">{inc.normativa}</td>
                                        <td className="px-4 py-2 border-b">{inc.tipoAuditoria}</td>
                                        <td className="px-4 py-2 border-b">{inc.impacto}</td>
                                        <td className="px-4 py-2 border-b">{inc.estado}</td>
                                        <td className="px-4 py-2 border-b">{inc.prioridad}</td>
                                        <td className="px-4 py-2 border-b">{inc.responsable}</td>
                                        <td className="px-4 py-2 border-b">
                                            <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                                                <button
                                                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                                    onClick={() => { setEditIdx(idx); setShowAdd(false); }}
                                                    type="button"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    onClick={() => {
                                                        if (window.confirm('¿Seguro que deseas eliminar esta incidencia?')) {
                                                            const nuevasIncidencias = incidencias.filter((_, i) => i !== idx);
                                                            setIncidencias(nuevasIncidencias);
                                                            localStorage.setItem(`incidencias_${id}`, JSON.stringify(nuevasIncidencias));
                                                            window.dispatchEvent(new Event('storage'));
                                                        }
                                                    }}
                                                    type="button"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {incidencias.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="text-center py-4 text-gray-500">
                                            No hay incidencias registradas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegistroIncidencias;