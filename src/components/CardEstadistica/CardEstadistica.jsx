
export const CardEstadistica = ({ titulo, valor, icono, color, descripcion, loading }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
    gray: 'bg-gray-50 border-gray-200 text-gray-600'
  };

  return (
    <div className={`border rounded-lg p-6 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{titulo}</p>
          <p className="text-3xl font-bold mt-2">
            {loading ? '...' : valor.toLocaleString()}
          </p>
          <p className="text-sm opacity-75 mt-1">{descripcion}</p>
        </div>
        <div className="text-4xl opacity-50">{icono}</div>
      </div>
    </div>
  );
};