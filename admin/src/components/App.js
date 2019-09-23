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


const FilterForm = 
    <SimpleForm>
        <TextInput source="username" />
        <TextInput source="filter" />
    </SimpleForm>
const FilterEdit = props => <Edit {...props}>{FilterForm}</Edit>;
const FilterCreate = props => <Create {...props}>{FilterForm}</Create>;

const FilterList = props =>
  <List {...props}>
    <Datagrid rowClick="edit">
        <TextField source="username" />
        <TextField source="filter" />
    </Datagrid>
  </List>;

const TranslationForm = 
    <SimpleForm>
        <TextInput source="key" />
        <LongTextInput source="content_en" />
        <LongTextInput source="content_de" />
    </SimpleForm>
const TranslationEdit = props => <Edit {...props}>{TranslationForm}</Edit>;
const TranslationCreate = props => <Create {...props}>{TranslationForm}</Create>;


const App = () => 
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="entry" list={EntryList} edit={EntryEdit} create={EntryCreate}/>
    <Resource name="filter" list={FilterList} edit={FilterEdit} create={FilterCreate}/>
    <Resource name="translation" list={ListGuesser} edit={TranslationEdit} create={TranslationCreate}/>
  </Admin>

export default App;