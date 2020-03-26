import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function loadIncidents() {
      try {
        const response = await api.get('profile', { 
          headers: {
            Authorization: ongId,
          }
         });
         
         setIncidents(response.data);

      } catch (err) {
        toast.error('Falha ao listar os casos.');
      }
    }

    loadIncidents();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, { 
        headers: {
          Authorization: ongId,
        }
       });

       setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      toast.error('Erro ao deletar o caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Caso cadastrados</h1>

      <ul>
        {incidents?.map(item => (
          <li key={String(item.id)}>
            <strong>CASO:</strong>
            <p>{item.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{item.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
             }).format(item.value)}</p>

            <button 
              type="button" 
              onClick={() => handleDeleteIncident(item.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}
