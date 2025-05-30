import React from 'react';
import { useAppContext } from '../context/AppContext';

const ChangeHistory: React.FC = () => {
  const { changesStack, undoLastChange } = useAppContext();
  
  const changes = changesStack.getAll().reverse(); // Show newest changes first
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Changes</h2>
        <button
          className="btn bg-accent-400 text-gray-900 hover:bg-accent-500 focus:ring-accent-400 text-sm py-1"
          onClick={undoLastChange}
          disabled={changes.length === 0}
        >
          Undo Last Change
        </button>
      </div>
      
      {changes.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No changes recorded yet</div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {changes.map((change, index) => (
            <div
              key={index}
              className="border-l-4 border-primary-500 pl-3 py-2 animate-fade-in"
            >
              <div className="flex justify-between">
                <span className="font-medium">Order #{change.orderId.slice(0, 8)}</span>
                <span className="text-sm text-gray-600">
                  {new Date(change.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm">
                Status changed from{' '}
                <span className="font-medium text-gray-700">{change.previousStatus}</span> to{' '}
                <span className="font-medium text-primary-600">{change.newStatus}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">{change.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeHistory;