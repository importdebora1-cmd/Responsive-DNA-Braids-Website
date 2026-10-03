import { useState } from 'react';
import { Tranca } from '../data/servicos';
import "../styles/Agenda.scss";

interface AgendaProps {
  selectedService: Tranca | null;
  setCurrentPage: (page: 'inicio' | 'catalogo' | 'simular' | 'agendamentos' | 'galeria' | 'perfil') => void;
}

export function Agenda({ selectedService, setCurrentPage }: AgendaProps) {
  const hoje = new Date();
  const [ano, setAno] = useState(hoje.getFullYear());
  const [mes, setMes] = useState(hoje.getMonth());

  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  
  // Estados para o formulário da cliente
  const [nomeCliente, setNomeCliente] = useState('');
  const [whatsappCliente, setWhatsappCliente] = useState('');

  const [modoAdmin, setModoAdmin] = useState(false);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([
    '08:00', '10:00', '13:00', '15:00', '17:00'
  ]);
  const [novoHorarioInput, setNovoHorarioInput] = useState('');

  const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const primeiroDiaDoMesIndex = new Date(ano, mes, 1).getDay(); 
  const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();
  const deslocamentoDias = primeiroDiaDoMesIndex === 0 ? 6 : primeiroDiaDoMesIndex - 1;

  const diasGrade: (number | null)[] = [];
  for (let i = 0; i < deslocamentoDias; i++) {
    diasGrade.push(null);
  }
  for (let i = 1; i <= totalDiasNoMes; i++) {
    diasGrade.push(i);
  }

  const removerHorario = (horaParaRemover: string) => {
    setHorariosDisponiveis(horariosDisponiveis.filter(h => h !== horaParaRemover));
  };

  const adicionarHorario = (e: React.FormEvent) => {
    e.preventDefault();
    if (novoHorarioInput && !horariosDisponiveis.includes(novoHorarioInput)) {
      const listaOrdenada = [...horariosDisponiveis, novoHorarioInput].sort();
      setHorariosDisponiveis(listaOrdenada);
      setNovoHorarioInput('');
    }
  };

  const handleSolicitarAgendamento = () => {
    if (!nomeCliente || !whatsappCliente) {
      alert('Por favor, preencha seu nome e WhatsApp antes de continuar.');
      return;
    }
    alert(`Sucesso! Agendamento de ${selectedService?.nome} solicitado para o dia ${diaSelecionado}/${mes+1}/${ano} às ${horarioSelecionado}.\n\nCliente: ${nomeCliente}\nWhatsApp: ${whatsappCliente}\n\nStatus: AGUARDANDO CONFIRMAÇÃO.`);
  };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: '#0d0d0d', padding: '20px', borderRadius: '16px', border: '1px solid #222' }}>
      
      {/* ALTERNAR MODO CLIENTE / ADMIN */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <button 
          onClick={() => setModoAdmin(!modoAdmin)}
          style={{ backgroundColor: 'transparent', border: '1px solid #333', color: '#888', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}
        >
          {modoAdmin ? '👁️ Ver como Cliente' : '⚙️ Editar Horários (Admin)'}
        </button>
      </div>

      {/* PAINEL ADMINISTRATIVO */}
      {modoAdmin && (
        <div>
          <h2 style={{ color: '#D4AF37', fontSize: '20px', marginBottom: '5px' }}>Configuração de Horários</h2>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>Adicione ou remova os horários de atendimento do estúdio.</p>

          <form onSubmit={adicionarHorario} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="time" 
              value={novoHorarioInput}
              onChange={(e) => setNovoHorarioInput(e.target.value)}
              style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#141414', color: '#fff', fontSize: '16px' }}
            />
            <button type="submit" style={{ backgroundColor: '#D4AF37', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', color: '#000' }}>
              + Adicionar
            </button>
          </form>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {horariosDisponiveis.map((hora) => (
              <div key={hora} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1a1a1a', padding: '8px 14px', borderRadius: '20px', border: '1px solid #333' }}>
                <span style={{ fontWeight: 'bold', color: '#fff' }}>{hora}</span>
                <button 
                  type="button"
                  onClick={() => removerHorario(hora)}
                  style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', padding: 0 }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISÃO DO CLIENTE */}
      {!modoAdmin && (
        <div>
          <h2 style={{ color: '#D4AF37', fontSize: '22px', margin: '0 0 5px 0' }}>Agendamento</h2>
          {selectedService && (
            <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px' }}>
              Selecionado: <strong style={{ color: '#fff' }}>{selectedService.nome}</strong>
            </p>
          )}

          {/* CONTROLE DO MÊS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <button onClick={() => { if(mes > 0) setMes(mes-1); else { setMes(11); setAno(ano-1); } }} style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '18px', cursor: 'pointer' }}>◀</button>
            <span style={{ fontWeight: 'bold', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>{mesesNomes[mes]} {ano}</span>
            <button onClick={() => { if(mes < 11) setMes(mes+1); else { setMes(0); setAno(ano+1); } }} style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '18px', cursor: 'pointer' }}>▶</button>
          </div>

          {/* DIAS DA SEMANA */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '10px' }}>
            {diasDaSemana.map(d => (
              <span key={d} style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>{d}</span>
            ))}
          </div>

          {/* GRADE DE DIAS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '25px' }}>
            {diasGrade.map((dia, index) => {
              if (dia === null) return <div key={`empty-${index}`} />;

              const dataAtualVerificacao = new Date(ano, mes, dia);
              const ehDomingo = dataAtualVerificacao.getDay() === 0;
              const ehPassado = dataAtualVerificacao < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

              const isSelected = diaSelecionado === dia;
              const desabilitado = ehDomingo || ehPassado;

              return (
                <button
                  key={`dia-${dia}`}
                  disabled={desabilitado}
                  onClick={() => { setDiaSelecionado(dia); setHorarioSelecionado(null); }}
                  style={{
                    height: '40px', borderRadius: '8px', border: isSelected ? '1px solid #D4AF37' : '1px solid #222',
                    backgroundColor: isSelected ? '#D4AF37' : desabilitado ? '#121212' : '#1a1a1a',
                    color: isSelected ? '#000' : desabilitado ? '#444' : '#fff',
                    cursor: desabilitado ? 'not-allowed' : 'pointer',
                    fontWeight: isSelected || !desabilitado ? 'bold' : 'normal',
                    fontSize: '14px', transition: '0.2s',
                    textDecoration: ehPassado ? 'line-through' : 'none'
                  }}
                >
                  {dia}
                </button>
              );
            })}
          </div>

          {/* LEGENDA */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', fontSize: '11px', color: '#888', marginBottom: '25px' }}>
            <div><span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#1a1a1a', borderRadius: '50%', marginRight: '5px' }}></span> Disponível</div>
            <div><span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#444', borderRadius: '50%', marginRight: '5px' }}></span> Indisponível</div>
          </div>

          {/* SELEÇÃO DE HORÁRIOS E FORMULÁRIO */}
          {diaSelecionado && (
            <div>
              <h3 style={{ fontSize: '15px', marginBottom: '12px', color: '#fff' }}>Horários para o dia {diaSelecionado}:</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
                {horariosDisponiveis.map((hora) => {
                  const isHoraSelected = horarioSelecionado === hora;
                  return (
                    <button
                      key={hora}
                      onClick={() => setHorarioSelecionado(hora)}
                      style={{
                        padding: '10px 18px', borderRadius: '20px', cursor: 'pointer',
                        border: isHoraSelected ? '1px solid #D4AF37' : '1px solid #333',
                        backgroundColor: isHoraSelected ? 'rgba(212, 175, 55, 0.1)' : '#141414',
                        color: isHoraSelected ? '#D4AF37' : '#fff', fontWeight: 'bold', transition: '0.2s'
                      }}
                    >
                      {hora}
                    </button>
                  );
                })}
              </div>

              {/* CAMPOS DE DADOS DA CLIENTE */}
              {horarioSelecionado && (
  <>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '30px',
      }}
    >
      <h3
        style={{
          fontSize: '15px',
          color: '#fff',
          margin: 0,
        }}
      >
        Seus Dados:
      </h3>

      <input
        type="text"
        placeholder="Seu Nome Completo"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #333',
          backgroundColor: '#141414',
          color: '#fff',
          fontSize: '14px',
        }}
      />

      <input
        type="tel"
        placeholder="Seu WhatsApp (com DDD)"
        value={whatsappCliente}
        onChange={(e) => setWhatsappCliente(e.target.value)}
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #333',
          backgroundColor: '#141414',
          color: '#fff',
          fontSize: '14px',
        }}
      />
    </div>

    <button
      disabled={
        !horarioSelecionado ||
        !selectedService ||
        !nomeCliente ||
        !whatsappCliente
      }
      onClick={handleSolicitarAgendamento}
      style={{
        width: '100%',
        padding: '15px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        backgroundColor:
          horarioSelecionado && nomeCliente && whatsappCliente
            ? '#D4AF37'
            : '#333',
        color:
          horarioSelecionado && nomeCliente && whatsappCliente
            ? '#000'
            : '#666',
        cursor:
          horarioSelecionado && nomeCliente && whatsappCliente
            ? 'pointer'
            : 'not-allowed',
      }}
        >
      Solicitar Agendamento
    </button>
  </>
)}

              
            </div>
          )}
        </div>
      )}

    </div>
  );
}