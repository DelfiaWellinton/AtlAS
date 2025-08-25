import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  ArrowRightLeft, 
  CheckCircle, 
  FileText, 
  Search, 
  LogOut, 
  Plus, 
  Eye, 
  Edit3,
  Archive,
  RotateCcw,
  Users,
  Building,
  BarChart3,
  Settings,
  Home,
  ShoppingCart
} from 'lucide-react';

const SistemaAtlas = () => {
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [token, setToken] = useState('');
  const [loginError, setLoginError] = useState('');

  // Mock data
  const mockGalpoes = [
    { id: 1, nome: 'Galpão Central', tipo: 'Armazém', permite_saida: true },
    { id: 2, nome: 'PD Norte', tipo: 'PD', permite_saida: true },
    { id: 3, nome: 'Armazém Sul', tipo: 'Armazém', permite_saida: false }
  ];

  const mockRecebimentos = [
    { id: 1, data: '2024-01-15', galpao: 'Galpão Central', projeto: 'Projeto A', operador: 'João Silva', status: 'Pendente' },
    { id: 2, data: '2024-01-14', galpao: 'PD Norte', projeto: 'Projeto B', operador: 'Maria Santos', status: 'Aprovado' },
    { id: 3, data: '2024-01-13', galpao: 'Armazém Sul', projeto: 'Projeto C', operador: 'Pedro Costa', status: 'Pendente' }
  ];

  const mockAparelhos = [
    { id: 1, codigo: 'AP001', sku: 'SKU001', descricao: 'Aparelho Tipo A', caixa: 'CX001', status: 'Disponível' },
    { id: 2, codigo: 'AP002', sku: 'SKU002', descricao: 'Aparelho Tipo B', caixa: 'CX002', status: 'Em trânsito' },
    { id: 3, codigo: 'AP003', sku: 'SKU003', descricao: 'Aparelho Tipo C', caixa: 'CX003', status: 'Bloqueado' }
  ];

  const mockSaidas = [
    { id: 1, data: '2024-01-15', galpao: 'Galpão Central', projeto: 'Projeto A', status: 'Pendente' },
    { id: 2, data: '2024-01-14', galpao: 'PD Norte', projeto: 'Projeto B', status: 'Aprovado' }
  ];

  const mockTransferencias = [
    { id: 1, origem: 'Galpão Central', destino: 'PD Norte', aparelho: 'AP001', status: 'Pendente' },
    { id: 2, origem: 'Armazém Sul', destino: 'Galpão Central', aparelho: 'AP003', status: 'Aprovado' }
  ];

  const handleLogin = () => {
    if (token.trim()) {
      setUser({ 
        nome: 'Operador Sistema', 
        token: token,
        perfil: 'Conferente',
        galpoes: [1, 2]
      });
      setLoginError('');
    } else {
      setLoginError('Token é obrigatório');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    setActiveModule('dashboard');
  };

  // Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg text-text-light flex items-center justify-center p-4">
        <div className="bg-dark-card border border-dark-border rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-green mb-2">Sistema AtlAS</h1>
            <p className="text-text-muted">Sistema de Gestão Logística</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Token de Acesso</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                placeholder="Digite seu token"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            {loginError && (
              <div className="text-red-500 text-sm">{loginError}</div>
            )}
            
            <button
              onClick={handleLogin}
              className="w-full bg-primary-green text-black font-medium py-2 px-4 rounded hover:bg-green-400 transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const modules = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'recebimento', label: 'Recebimento', icon: Package },
    { key: 'triagem', label: 'Triagem Reversa', icon: RotateCcw },
    { key: 'transferencia', label: 'Transferências', icon: ArrowRightLeft },
    { key: 'saida', label: 'Saídas', icon: Truck },
    { key: 'aprovacao', label: 'Aprovações', icon: CheckCircle },
    { key: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { key: 'pesquisa', label: 'Pesquisa', icon: Search }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm">Recebimentos Pendentes</p>
              <p className="text-2xl font-bold text-primary-green">
                {mockRecebimentos.filter(r => r.status === 'Pendente').length}
              </p>
            </div>
            <Package className="text-primary-green" size={32} />
          </div>
        </div>

        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm">Saídas Pendentes</p>
              <p className="text-2xl font-bold text-primary-green">
                {mockSaidas.filter(s => s.status === 'Pendente').length}
              </p>
            </div>
            <Truck className="text-primary-green" size={32} />
          </div>
        </div>

        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm">Transferências Pendentes</p>
              <p className="text-2xl font-bold text-primary-green">
                {mockTransferencias.filter(t => t.status === 'Pendente').length}
              </p>
            </div>
            <ArrowRightLeft className="text-primary-green" size={32} />
          </div>
        </div>

        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm">Aparelhos em Estoque</p>
              <p className="text-2xl font-bold text-primary-green">
                {mockAparelhos.filter(a => a.status === 'Disponível').length}
              </p>
            </div>
            <Archive className="text-primary-green" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4">Últimos Recebimentos</h3>
          <div className="space-y-3">
            {mockRecebimentos.slice(0, 3).map(recebimento => (
              <div key={recebimento.id} className="flex justify-between items-center py-2 border-b border-dark-border">
                <div>
                  <p className="font-medium">{recebimento.galpao}</p>
                  <p className="text-sm text-text-muted">{recebimento.projeto} - {recebimento.data}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  recebimento.status === 'Aprovado' 
                    ? 'bg-green-800 text-green-200' 
                    : 'bg-yellow-800 text-yellow-200'
                }`}>
                  {recebimento.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4">Atalhos Rápidos</h3>
          <div className="grid grid-cols-2 gap-3">
            {modules.slice(1, 5).map(module => (
              <button
                key={module.key}
                onClick={() => setActiveModule(module.key)}
                className="flex items-center space-x-2 p-3 bg-dark-bg border border-dark-border rounded hover:bg-hover-green-bg hover:border-primary-green transition-colors"
              >
                <module.icon size={20} className="text-primary-green" />
                <span className="text-sm">{module.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecebimento = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recebimento de Produtos</h2>
        <button className="bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Novo Recebimento</span>
        </button>
      </div>

      <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg">
              <tr>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Galpão</th>
                <th className="px-4 py-3 text-left">Projeto</th>
                <th className="px-4 py-3 text-left">Operador</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockRecebimentos.map(recebimento => (
                <tr key={recebimento.id} className="border-t border-dark-border">
                  <td className="px-4 py-3">{recebimento.data}</td>
                  <td className="px-4 py-3">{recebimento.galpao}</td>
                  <td className="px-4 py-3">{recebimento.projeto}</td>
                  <td className="px-4 py-3">{recebimento.operador}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      recebimento.status === 'Aprovado' 
                        ? 'bg-green-800 text-green-200' 
                        : 'bg-yellow-800 text-yellow-200'
                    }`}>
                      {recebimento.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-primary-green hover:text-green-400">
                        <Eye size={16} />
                      </button>
                      <button className="text-blue-400 hover:text-blue-300">
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTriagem = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Triagem Reversa</h2>
        <button className="bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Novo Pacote</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4">Criar Pacote de Triagem</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Código de Rastreio</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                  placeholder="Digite o código"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-Ticket (Opcional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                  placeholder="Número do ticket"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Projeto</label>
                <select className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none">
                  <option>Projeto A</option>
                  <option>Projeto B</option>
                  <option>Projeto C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Data de Recebimento</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                />
              </div>
            </div>

            <div className="border-t border-dark-border pt-4">
              <h4 className="font-medium mb-3">Aparelhos</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    type="text"
                    placeholder="Código"
                    className="px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="SKU"
                    className="px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                  />
                  <select className="px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none">
                    <option>Destino</option>
                    <option>Armazenamento</option>
                    <option>Laboratório</option>
                    <option>Outro</option>
                  </select>
                  <button className="bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors">
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4">Pacotes Pendentes</h3>
          <div className="space-y-3">
            <div className="p-3 bg-dark-bg rounded border border-dark-border">
              <div className="flex justify-between items-center">
                <span className="font-medium">PKG001</span>
                <span className="text-xs text-text-muted">15/01/2024</span>
              </div>
              <p className="text-sm text-text-muted">3 aparelhos</p>
            </div>
            <div className="p-3 bg-dark-bg rounded border border-dark-border">
              <div className="flex justify-between items-center">
                <span className="font-medium">PKG002</span>
                <span className="text-xs text-text-muted">14/01/2024</span>
              </div>
              <p className="text-sm text-text-muted">1 aparelho</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransferencia = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transferências</h2>
        <button className="bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Nova Transferência</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4">Criar Transferência</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Código do Aparelho</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                placeholder="Digite o código"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Galpão de Destino</label>
              <select className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none">
                <option>Selecionar destino</option>
                {mockGalpoes.map(galpao => (
                  <option key={galpao.id} value={galpao.id}>{galpao.nome}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Localização (opcional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                placeholder="Ex: R1-A-05"
              />
            </div>

            <button className="w-full bg-primary-green text-black py-2 px-4 rounded font-medium hover:bg-green-400 transition-colors">
              Solicitar Transferência
            </button>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4">Transferências Pendentes</h3>
          <div className="space-y-3">
            {mockTransferencias.map(transferencia => (
              <div key={transferencia.id} className="p-3 bg-dark-bg rounded border border-dark-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{transferencia.aparelho}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    transferencia.status === 'Aprovado' 
                      ? 'bg-green-800 text-green-200' 
                      : 'bg-yellow-800 text-yellow-200'
                  }`}>
                    {transferencia.status}
                  </span>
                </div>
                <p className="text-sm text-text-muted">
                  {transferencia.origem} → {transferencia.destino}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSaida = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Saídas de Produtos</h2>
        <button className="bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Nova Saída</span>
        </button>
      </div>

      <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg">
              <tr>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Galpão</th>
                <th className="px-4 py-3 text-left">Projeto</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockSaidas.map(saida => (
                <tr key={saida.id} className="border-t border-dark-border">
                  <td className="px-4 py-3">{saida.data}</td>
                  <td className="px-4 py-3">{saida.galpao}</td>
                  <td className="px-4 py-3">{saida.projeto}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      saida.status === 'Aprovado' 
                        ? 'bg-green-800 text-green-200' 
                        : 'bg-yellow-800 text-yellow-200'
                    }`}>
                      {saida.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-primary-green hover:text-green-400">
                        <Eye size={16} />
                      </button>
                      <button className="text-blue-400 hover:text-blue-300">
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAprovacao = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Central de Aprovações</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Recebimentos Pendentes</h3>
          <div className="space-y-3">
            {mockRecebimentos.filter(r => r.status === 'Pendente').map(recebimento => (
              <div key={recebimento.id} className="p-3 bg-dark-bg rounded border border-dark-border">
                <p className="font-medium">{recebimento.galpao}</p>
                <p className="text-sm text-text-muted">{recebimento.projeto}</p>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                    Aprovar
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Rejeitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4 text-blue-400">Transferências Pendentes</h3>
          <div className="space-y-3">
            {mockTransferencias.filter(t => t.status === 'Pendente').map(transferencia => (
              <div key={transferencia.id} className="p-3 bg-dark-bg rounded border border-dark-border">
                <p className="font-medium">{transferencia.aparelho}</p>
                <p className="text-sm text-text-muted">{transferencia.origem} → {transferencia.destino}</p>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                    Aprovar
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Rejeitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-card p-4 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4 text-orange-400">Saídas Pendentes</h3>
          <div className="space-y-3">
            {mockSaidas.filter(s => s.status === 'Pendente').map(saida => (
              <div key={saida.id} className="p-3 bg-dark-bg rounded border border-dark-border">
                <p className="font-medium">{saida.galpao}</p>
                <p className="text-sm text-text-muted">{saida.projeto}</p>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                    Aprovar
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Rejeitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPesquisa = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pesquisa Universal</h2>
      
      <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Buscar por código, SKU, projeto, galpão...</label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                placeholder="Digite sua busca"
              />
              <button className="bg-primary-green text-black px-6 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2">
                <Search size={16} />
                <span>Buscar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
        <div className="p-4 bg-dark-bg border-b border-dark-border">
          <h3 className="font-semibold">Resultados da Pesquisa</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg">
              <tr>
                <th className="px-4 py-3 text-left">Código</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Descrição</th>
                <th className="px-4 py-3 text-left">Localização</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAparelhos.map(aparelho => (
                <tr key={aparelho.id} className="border-t border-dark-border">
                  <td className="px-4 py-3">{aparelho.codigo}</td>
                  <td className="px-4 py-3">{aparelho.sku}</td>
                  <td className="px-4 py-3">{aparelho.descricao}</td>
                  <td className="px-4 py-3">{aparelho.caixa}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      aparelho.status === 'Disponível' 
                        ? 'bg-green-800 text-green-200' 
                        : aparelho.status === 'Em trânsito'
                        ? 'bg-blue-800 text-blue-200'
                        : 'bg-red-800 text-red-200'
                    }`}>
                      {aparelho.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRelatorios = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Relatórios</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4">Filtros</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Relatório</label>
              <select className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none">
                <option>Movimentações</option>
                <option>Estoque</option>
                <option>Auditoria</option>
                <option>Transferências</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Data Inicial</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Data Final</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Galpão</label>
              <select className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none">
                <option>Todos</option>
                {mockGalpoes.map(galpao => (
                  <option key={galpao.id} value={galpao.id}>{galpao.nome}</option>
                ))}
              </select>
            </div>

            <button className="w-full bg-primary-green text-black py-2 px-4 rounded font-medium hover:bg-green-400 transition-colors flex items-center justify-center space-x-2">
              <FileText size={16} />
              <span>Gerar Relatório</span>
            </button>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-lg font-semibold mb-4">Relatórios Recentes</h3>
          <div className="space-y-3">
            <div className="p-3 bg-dark-bg rounded border border-dark-border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Movimentações Janeiro</span>
                <span className="text-xs text-text-muted">15/01/2024</span>
              </div>
              <p className="text-sm text-text-muted">Movimentações - Todos os galpões</p>
            </div>
            <div className="p-3 bg-dark-bg rounded border border-dark-border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Estoque Atual</span>
                <span className="text-xs text-text-muted">14/01/2024</span>
              </div>
              <p className="text-sm text-text-muted">Estoque - Galpão Central</p>
            </div>
            <div className="p-3 bg-dark-bg rounded border border-dark-border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Auditoria Semanal</span>
                <span className="text-xs text-text-muted">13/01/2024</span>
              </div>
              <p className="text-sm text-text-muted">Auditoria - Todos os galpões</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return renderDashboard();
      case 'recebimento': return renderRecebimento();
      case 'triagem': return renderTriagem();
      case 'transferencia': return renderTransferencia();
      case 'saida': return renderSaida();
      case 'aprovacao': return renderAprovacao();
      case 'pesquisa': return renderPesquisa();
      case 'relatorios': return renderRelatorios();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-light">
      {/* Header */}
      <header className="bg-dark-card border-b border-dark-border px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary-green">Sistema AtlAS</h1>
            <span className="text-text-muted">|</span>
            <span className="text-sm text-text-muted">{user.perfil}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Olá, {user.nome}</span>
            <button
              onClick={handleLogout}
              className="text-text-muted hover:text-primary-green transition-colors"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-dark-card border-r border-dark-border min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {modules.map(module => (
                <li key={module.key}>
                  <button
                    onClick={() => setActiveModule(module.key)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
                      activeModule === module.key
                        ? 'bg-active-green-bg border border-primary-green text-primary-green'
                        : 'text-text-muted hover:bg-hover-green-bg hover:text-text-light'
                    }`}
                  >
                    <module.icon size={20} />
                    <span>{module.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SistemaAtlas;