import React from 'react';
import { 
  Admin, 
  DeleteButton, 
  Resource, 
  ListGuesser, 
  List, 
  Datagrid, 
  Edit, 
  Create, 
  SimpleForm, 
  TextInput, 
  TextField, 
  Toolbar, 
  FileInput, 
  FileField,
  ReferenceInput,
  SelectInput,
  LongTextInput,
  BooleanInput   
} from 'react-admin';

import { dataProvider } from '../helpers/dataProvider.js';
import authProvider from '../helpers/authProvider';

const EntryForm = 
    <SimpleForm>
        <TextInput source="musician" />
        <TextInput source="city" />
        <TextInput source="year" />
        <LongTextInput source="note" />
    </SimpleForm>
const EntryEdit = props => <Edit {...props}>{EntryForm}</Edit>;
const EntryCreate = props => <Create {...props}>{EntryForm}</Create>;

const EntryList = props =>
  <List {...props}>
    <Datagrid rowClick="edit">
        <TextField source="musician" />
        <TextField source="city" />
        <TextField source="year" />
        <TextField source="user_id" />
        <TextField source="isDeleted" />
    </Datagrid>
  </List>;


const App = () => 
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="entry" list={EntryList} edit={EntryEdit} create={EntryCreate}/>
  </Admin>

export default App;