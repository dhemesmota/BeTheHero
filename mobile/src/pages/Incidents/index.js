import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import logoImg from '../../assets/logo.png';
import IncidentCard from '../../components/IncidentCard';

import api from '../../services/api';

import { 
  Container,
  Header,
  Img,
  HeaderText,
  HeaderTextBold,
  Title,
  Description,
  IncidentList
 } from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.get('incidents', {
        params: { page }
      });

      setIncidents([...incidents, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
    } catch (err) {
      Alert.alert('Erro, não foi possível listar os casos.');
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <Container>
      <Header>
        <Img source={logoImg}/>
        <HeaderText>
          Total de <HeaderTextBold>{total} casos</HeaderTextBold>.
        </HeaderText>
      </Header>

      <Title>Bem-vindo!</Title>
      <Description>Escolha um dos casos abaixo e salve o dia.</Description>

      <IncidentList 
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <IncidentCard incident={incident} />
        )}
      />
    </Container>
  );
}
