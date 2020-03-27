import React, { useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import { 
  Container,
  Header,
  Img,
  Button,
  Incident,
  Title,
  Value,
  ContactBox,
  HeroTitle,
  HeroDescription,
  ButtonAction,
  ButtonActionText,
  ActionBox,
} from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const [incidentValue] = useState(Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  },).format(incident.value));

  const message = `Olá ${incident.name}, estou entrado em contato pois gostária de ajudar no caso "${incident.title}" com valor de ${incidentValue}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
  }

  return (
    <Container>
      <Header>
        <Img source={logoImg}/>
        
        <Button onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </Button>
      </Header>

      <Incident>
        <Title style={{ marginTop: 0 }}>ONG:</Title>
        <Value>{incident.name} de {incident.city}/{incident.uf}</Value>

        <Title>CASO:</Title>
        <Value>{incident.title}</Value>
        
        <Title>VALOR:</Title>
        <Value>{incidentValue}</Value>
      </Incident>

      <ContactBox>
        <HeroTitle>Salve o dia!</HeroTitle>
        <HeroTitle>Seja o herói desse caso.</HeroTitle>

        <HeroDescription>Entre em contato: </HeroDescription>

        <ActionBox>
          <ButtonAction onPress={sendWhatsapp}>
            <ButtonActionText>WhatsApp</ButtonActionText>
          </ButtonAction>

          <ButtonAction onPress={sendMail}>
            <ButtonActionText>E-mail</ButtonActionText>
          </ButtonAction>
        </ActionBox>
      </ContactBox>
    </Container>
  );
}
