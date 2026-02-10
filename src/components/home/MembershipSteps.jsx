import React from 'react';
import { UserCheck, FileSignature, CreditCard, CheckCircle2 } from 'lucide-react';

const MembershipSteps = () => {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-bold mb-4">¿Quieres ser Parte?</h2>
                <p className="text-slate-400">Estás a simples pasos de obtener tu membresía.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold mb-4">1</div>
                    <h3 className="text-lg font-bold mb-2">Registro</h3>
                    <p className="text-sm text-slate-400">Información básica de la empresa, pyme, consultor o CTO.</p>
                    <UserCheck className="h-6 w-6 text-slate-500 mt-4 opacity-50" />
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold mb-4">2</div>
                    <h3 className="text-lg font-bold mb-2">Convenio</h3>
                    <p className="text-sm text-slate-400">Descargar y firmar el Convenio de Membresía MITC.</p>
                    <FileSignature className="h-6 w-6 text-slate-500 mt-4 opacity-50" />
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold mb-4">3</div>
                    <h3 className="text-lg font-bold mb-2">Pago</h3>
                    <p className="text-sm text-slate-400">Tu membresía Business Connect tiene un costo anual.</p>
                    <CreditCard className="h-6 w-6 text-slate-500 mt-4 opacity-50" />
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold mb-4">4</div>
                    <h3 className="text-lg font-bold mb-2">Confirmación</h3>
                    <p className="text-sm text-slate-400">¡Listo! Ya formas parte del ecosistema de innovación.</p>
                    <CheckCircle2 className="h-6 w-6 text-slate-500 mt-4 opacity-50" />
                </div>
            </div>
        </div>
    </section>
  );
};

export default MembershipSteps;