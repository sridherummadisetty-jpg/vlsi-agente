import React, { useState } from 'react';
import { Sparkles, Send, Plus, Trash2 } from 'lucide-react';

interface SidebarProps {
  onGenerateRtl: (description: string) => void;
  isGenerating: boolean;
  onDesignChip: (description: string) => void;
  isDesigning: boolean;
}

export function Sidebar({ onGenerateRtl, isGenerating, onDesignChip, isDesigning }: SidebarProps) {
  const [prompt, setPrompt] = useState('');
  const [parameters, setParameters] = useState<{name: string, value: string}[]>([]);

  const handleAddParameter = () => {
    setParameters([...parameters, { name: '', value: '' }]);
  };

  const handleUpdateParameter = (index: number, field: 'name' | 'value', val: string) => {
    const newParams = [...parameters];
    newParams[index][field] = val;
    setParameters(newParams);
  };

  const handleRemoveParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const buildFinalPrompt = () => {
    let finalPrompt = prompt;
    const validParams = parameters.filter(p => p.name.trim() !== '');
    if (validParams.length > 0) {
      finalPrompt += '\n\nPlease include the following module parameters:\n';
      validParams.forEach(p => {
        finalPrompt += `- ${p.name}: ${p.value || 'default'}\n`;
      });
    }
    return finalPrompt;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerateRtl(buildFinalPrompt());
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#151619]">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Sparkles size={18} />
        </div>
        <div>
          <h1 className="font-semibold text-gray-200 text-sm">VLSI AI Assistant</h1>
          <p className="text-xs text-gray-500">RTL Generation & Verification</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Quick Examples</label>
          <div className="flex flex-col space-y-2">
            {[
              "A simple 4-bit full adder",
              "A 4-bit synchronous up/down counter with reset",
              "A 4-to-1 multiplexer",
              "A parameterized FIFO buffer",
              "An APB to I2C bridge"
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => setPrompt(example)}
                className="text-left text-xs bg-[#1A1C20] hover:bg-white/5 border border-white/5 hover:border-emerald-500/30 p-2 rounded-md transition-colors text-gray-400 hover:text-gray-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Parameters Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Module Parameters</label>
            <button 
              onClick={handleAddParameter}
              className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-emerald-400 transition-colors"
              title="Add Parameter"
            >
              <Plus size={14} />
            </button>
          </div>
          
          {parameters.length === 0 ? (
            <div className="text-xs text-gray-600 italic">No parameters defined.</div>
          ) : (
            <div className="space-y-2">
              {parameters.map((param, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Name (e.g. WIDTH)"
                    value={param.name}
                    onChange={(e) => handleUpdateParameter(idx, 'name', e.target.value)}
                    className="flex-1 min-w-0 bg-[#1A1C20] border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 8)"
                    value={param.value}
                    onChange={(e) => handleUpdateParameter(idx, 'value', e.target.value)}
                    className="w-20 shrink-0 bg-[#1A1C20] border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/50"
                  />
                  <button 
                    onClick={() => handleRemoveParameter(idx)}
                    className="p-1.5 shrink-0 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex flex-col space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your RTL module or Chip Architecture..."
            className="w-full h-32 bg-[#1A1C20] border border-white/10 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 resize-none"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => prompt.trim() && !isGenerating && !isDesigning && onGenerateRtl(buildFinalPrompt())}
              disabled={!prompt.trim() || isGenerating || isDesigning}
              className="flex-1 py-2 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30 disabled:opacity-50 transition-colors text-sm font-medium flex justify-center items-center"
            >
              {isGenerating ? 'Generating...' : 'Generate RTL'}
            </button>
            <button
              onClick={() => prompt.trim() && !isGenerating && !isDesigning && onDesignChip(buildFinalPrompt())}
              disabled={!prompt.trim() || isGenerating || isDesigning}
              className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 disabled:opacity-50 transition-colors text-sm font-medium flex justify-center items-center"
            >
              {isDesigning ? 'Designing...' : 'Design Chip'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
