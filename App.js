import React, { Component } from 'react';

import { 
  Form,
  Container,
  Content,
  Header,
  Body,
  Title,
  Item,
  Input,
  Icon,
  Spinner,
  Button,
  Text,
} from 'native-base';

import RepoList from './RepoList';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      isReady: false,
      isLoading: false,
      repositories: [],
    };
  }

  fecthRepositories = async () => {
    if(this.state.search.length > 0){
      this.setState({ isLoading : true});
      const response  = await fetch(`https://api.github.com/search/repositories?q=${this.state.search}`);
      const repo = await response.json();

      this.setState({
        repositories : repo.items,
        isLoading : false,
      })
    }
  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Go Native App</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Item last>
              <Icon active name='search'/>
              <Input 
                placeholder='Buscar'
                value={this.state.search}
                onChangeText={text => this.setState({ search : text})}
              />
            </Item>
          </Form>
          <Button 
            block 
            style={{ marginTop: 10}}
            onPress={this.fecthRepositories}
          >
          <Text>Buscar</Text>
          </Button>
          { this.state.isLoading
           ? <Spinner color="#999"/>
           : <RepoList repositories={this.state.repositories} /> }
        </Content>
      </Container>
    );
  }
}
