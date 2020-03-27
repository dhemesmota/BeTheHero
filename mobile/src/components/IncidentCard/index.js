import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { 
  Container, 
  Title, 
  Value, 
  Content, 
  Button, 
  TitleButton,
} from './styles';

export default function IncidentCard({ incident }) {
  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  return (
    <Container>
      <Title>ONG:</Title>
      <Value>{incident.name}</Value>

      <Title>CASO:</Title>
      <Value>{incident.title}</Value>
      
      <Title>VALOR:</Title>
      <Value>{Intl.NumberFormat(
        'pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
        }, 
        ).format(incident.value)}</Value>

      <Button onPress={() => navigateToDetail(incident)}>
        <TitleButton>Ver mais detalhes</TitleButton>
        <Feather name="arrow-right" size={16} color="#e02041" />
      </Button>
    </Container>
  );
}
