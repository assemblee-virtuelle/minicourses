import React from 'react';
import { ImageInput, 
  SelectInput, 
  TextInput, 
  TabbedForm, 
  FormTab, 
  ReferenceManyField, 
  AutocompleteArrayInput,
  ImageField } from 'react-admin';
// import { Field } from 'react-final-form';
import { MarkdownInput } from '@semapps/markdown-components';
import { ReferenceInput } from '@semapps/input-components';
import Alert from '@mui/lab/Alert';
import CourseTitle from './CourseTitle';
import Edit from '../../layout/Edit';
import AddLessonButton from "../../common/buttons/AddLessonButton";
import CardsList from "../../common/list/CardsList";
import LessonCard from "../Lesson/LessonCard";
import { getThemesOptions } from "../../utils";

// const Condition = ({ when, is, children }) => (
//   <Field name={when} subscription={{ value: true }}>
//     {({ input: { value } }) => (value === is ? children : null)}
//   </Field>
// );

const CourseEdit = props => (
  <Edit title={<CourseTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Description">
        {/* <Condition when="pair:hasStatus" is={process.env.REACT_APP_MIDDLEWARE_URL + 'status/unavailable'}>
          <Alert severity="info" fullWidth>Lorsque vous serez satisfait du parcours, vous pourrez changer son statut à "Disponible"</Alert>
        </Condition> */}
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <ImageInput source="pair:depictedBy" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'tutor:CourseStatus' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <AutocompleteArrayInput source="pair:hasTopic" fullWidth choices={getThemesOptions()} />
      </FormTab>
      <FormTab label="Fiches">
        <ReferenceManyField
          addLabel={false}
          reference="Lesson"
          target="pair:partOf"
          sort={{ field: 'tutor:order', order: 'ASC' }}
        >
          <CardsList CardComponent={LessonCard} link="edit" />
        </ReferenceManyField>
        <AddLessonButton />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default CourseEdit;
