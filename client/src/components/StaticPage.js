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
`