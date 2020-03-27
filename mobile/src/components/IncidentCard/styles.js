import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: #41414d;
  font-weight: bold;
`;

export const Value = styled.Text`
  font-size: 15px;
  margin-top: 8px;
  font-size: 15px;
  margin-bottom: 24px;
  color: #737380;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleButton = styled.Text`
  color: #e02041;
  font-size: 15px;
  font-weight: bold;
`;