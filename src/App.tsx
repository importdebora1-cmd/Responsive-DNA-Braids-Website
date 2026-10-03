import { useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
// PASSO 1: Importamos o componente do arquivo que você criou!
import { Catalogo } from './components/Catalogo' 
import { Tranca } from './data/servicos'
import { Agenda } from './components/Agenda'


// 1. Definição estrita das páginas que aparecem no seu menu
type Page = 'inicio' | 'catalogo' | 'simular' | 'agendamentos' | 'galeria' | 'perfil'

function App() {
  // Registro automático do PWA
  useRegisterSW({ onNeedRefresh() { alert('Nova versão do app disponível! Atualizando...') } })

  // Estado para controlar qual tela está ativa
  const [currentPage, setCurrentPage] = useState<Page>('inicio')
  
  // PASSO 2: Criamos o estado para armazenar a trança selecionada pelo catálogo
  const [selectedService, setSelectedService] = useState<Tranca | null>(null)

  return (
    <div style={{ backgroundColor: '#0b0b0b', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif' }}>
      
      {/* ────────────────────────────────────────────────────────
          NAVBAR SUPERIOR (Estilo Desktop)
          ──────────────────────────────────────────────────────── */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', backgroundColor: '#0d0d0d', borderBottom: '1px solid #1a1a1a'
      }}>
        {/* LOGO */}
        <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => setCurrentPage('inicio')}>
          <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '20px', letterSpacing: '1px' }}>DNA</span>
          <span style={{ color: '#ffffff', fontSize: '10px', letterSpacing: '2px', marginTop: '-3px' }}>BRAIDS</span>
        </div>

        {/* LINKS DE NAVEGAÇÃO (DESKTOP) */}
        <nav className="desktop-menu" style={{ display: 'flex', gap: '30px' }}>
          {(['inicio', 'catalogo', 'simular', 'agendamentos', 'galeria', 'perfil'] as Page[]).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer',
                color: currentPage === page ? '#D4AF37' : '#aaaaaa',
                textTransform: 'capitalize', transition: '0.2s', fontWeight: currentPage === page ? 'bold' : 'normal'
              }}
            >
              {page === 'inicio' ? 'Início' : page === 'galeria' ? 'Minha Galeria' : page}
            </button>
          ))}
        </nav>

        {/* BOTÃO CTA DE AGENDAMENTO */}
        <button 
          onClick={() => setCurrentPage('agendamentos')}
          style={{
            backgroundColor: '#D4AF37', color: '#000000', border: 'none',
            padding: '10px 25px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          Agendar
        </button>
      </header>

      {/* ────────────────────────────────────────────────────────
          CONTEÚDO DINÂMICO (Onde o restante da estrutura fica)
          ──────────────────────────────────────────────────────── */}
      <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', paddingBottom: '100px' }}>
        
        {/* TELA 1: INÍCIO (BANNER PRINCIPAL) */}
        {currentPage === 'inicio' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1 style={{ fontSize: '48px', margin: 0, fontWeight: 'bold' }}>Seu estilo,<br/><span style={{ color: '#D4AF37' }}>Sua identidade.</span></h1>
            <p style={{ color: '#888888', maxWidth: '500px', fontSize: '16px' }}>
              Três gerações, uma só arte. Especialistas em tranças, box braids, nagô e cuidados que valorizam sua história.
            </p>
            <button 
              onClick={() => setCurrentPage('catalogo')}
              style={{
                border: '1px solid #D4AF37', color: '#D4AF37', background: 'none',
                padding: '12px 30px', borderRadius: '6px', fontWeight: 'bold', width: 'fit-content', cursor: 'pointer', marginTop: '20px'
              }}
            >
              Conhecer Catálogo
            </button>
          </div>
        )}

        {/* TELA 2: CATÁLOGO (A única linha limpa agora funciona perfeitamente!) */}
        {currentPage === 'catalogo' && (
          <Catalogo 
            onSelectService={setSelectedService} 
            setCurrentPage={setCurrentPage} 
          />
        )}

        {/* TELA 3: SIMULAR */}
        {currentPage === 'simular' && (
          <div>
            <h2 style={{ color: '#D4AF37' }}>Simulador Visual</h2>
            <p style={{ color: '#aaa' }}>Área interativa para a cliente enviar uma foto ou escolher estilos para simular o visual das tranças.</p>
          </div>
        )}

        {/* TELA 4: AGENDAMENTOS */}
        {currentPage === 'agendamentos' && (
          <Agenda 
            selectedService={selectedService} 
            setCurrentPage={setCurrentPage} 
          />
        )}

        {/* TELA 5: MINHA GALERIA */}
        {currentPage === 'galeria' && (
          <div>
            <h2 style={{ color: '#D4AF37' }}>Minha Galeria</h2>
            <p style={{ color: '#aaa' }}>Fotos de inspiração das clientes e trabalhos autorais realizados pelo estúdio.</p>
          </div>
        )}

        {/* TELA 6: PERFIL */}
        {currentPage === 'perfil' && (
          <div>
            <h2 style={{ color: '#D4AF37' }}>Meu Perfil</h2>
            <p style={{ color: '#aaa' }}>Gerenciamento de dados da cliente e histórico de agendamentos solicitados ou confirmados.</p>
          </div>
        )}

      </main>

      {/* ────────────────────────────────────────────────────────
          NAVEGAÇÃO INFERIOR EXCLUSIVA PARA CELULAR (Estilo Mobile App)
          ──────────────────────────────────────────────────────── */}
      <nav className="mobile-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px',
        backgroundColor: '#0d0d0d', borderTop: '1px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000
      }}>
        <button onClick={() => setCurrentPage('inicio')} style={{ background: 'none', border: 'none', color: currentPage === 'inicio' ? '#D4AF37' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px' }}>
          <span style={{ fontSize: '20px' }}>🏠</span> Início
        </button>
        <button onClick={() => setCurrentPage('catalogo')} style={{ background: 'none', border: 'none', color: currentPage === 'catalogo' ? '#D4AF37' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px' }}>
          <span style={{ fontSize: '20px' }}>💇</span> Serviços
        </button>
        <button onClick={() => setCurrentPage('agendamentos')} style={{ background: 'none', border: 'none', color: currentPage === 'agendamentos' ? '#D4AF37' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px' }}>
          <span style={{ fontSize: '20px' }}>📅</span> Agenda
        </button>
        <button onClick={() => setCurrentPage('perfil')} style={{ background: 'none', border: 'none', color: currentPage === 'perfil' ? '#D4AF37' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px' }}>
          <span style={{ fontSize: '20px' }}>👤</span> Perfil
        </button>
      </nav>

    </div>
  )
}

export default App
