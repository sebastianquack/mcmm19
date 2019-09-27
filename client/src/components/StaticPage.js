import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'
import { t } from '../helpers'

import styled from 'styled-components'

class StaticPage extends Component {
  constructor(props) {
    super(props);
      this.state = {
    }
  }

  render() {
                
    return (
      <StaticContainer>

        <div 
          dangerouslySetInnerHTML={{__html: t(this.props.translations, this.props.pageKey + "_content", this.props.locale)}}
        />

      </StaticContainer>
    );
  }
}

export default StaticPage;

const StaticContainer = styled.div`
  padding: 1.25rem;
  font-family: NeutraTextDemi;
  p {
    margin-bottom: 1rem;
  }
  h2 {
    font-family: NeutraText;
    margin-bottom: 1rem;
  }
  a {
    color: #000;
    :visited {
      color: #000;
    }
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`