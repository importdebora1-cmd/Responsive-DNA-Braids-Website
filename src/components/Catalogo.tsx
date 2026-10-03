import { servicosTrancas, Tranca } from '../data/servicos';

interface CatalogoProps {
  onSelectService: (service: Tranca) => void;
  setCurrentPage: (page: 'inicio' | 'catalogo' | 'simular' | 'agendamentos' | 'galeria' | 'perfil') => void;
}

export function Catalogo({ onSelectService, setCurrentPage }: CatalogoProps) {
  return (
    <div>
      <h2 style={{ color: '#D4AF37', fontSize: '24px', margin: '0 0 5px 0' }}>Nossos Serviços</h2>
      <p style={{ color: '#888888', fontSize: '14px', marginBottom: '25px' }}>
        Escolha o estilo que mais combina com você e agende seu horário.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {servicosTrancas.map((tranca) => (
          <div key={tranca.id} style={{ 
            backgroundColor: '#141414', borderRadius: '16px', overflow: 'hidden', 
            border: '1px solid #222', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            <div style={{ width: '100%', height: '200px', backgroundColor: '#222', position: 'relative' }}>
              <img 
                src={tranca.imagem} 
                alt={tranca.nome}
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ 
                position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(0,0,0,0.75)', 
                color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', border: '1px solid #333'
              }}>
                ⏱️ {tranca.duracao}
              </span>
            </div>

            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#ffffff' }}>{tranca.nome}</h3>
              <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#aaaaaa', lineHeight: '1.5' }}>
                {tranca.desc}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>A partir de</span>
                  <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '18px' }}>R$ {tranca.preco}</span>
                </div>
                
                <button 
                  onClick={() => { onSelectService(tranca); setCurrentPage('agendamentos'); }}
                  style={{ 
                    backgroundColor: '#D4AF37', color: '#000', border: 'none', 
                    padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
