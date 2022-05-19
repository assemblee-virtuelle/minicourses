import React from 'react';
import { ImageInput, SelectInput, TextInput, TabbedForm, FormTab, ReferenceManyField, AutocompleteArrayInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField, ReferenceInput, ReferenceArrayInput } from '@semapps/semantic-data-provider';
import CourseTitle from './CourseTitle';
import Edit from '../../layout/Edit';
import AddLessonButton from "../../common/buttons/AddLessonButton";
import CardsList from "../../common/list/CardsList";
import LessonCard from "../Lesson/LessonCard";

const CourseEdit = props => (
  <Edit title={<CourseTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Description">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <ImageInput source="pair:depictedBy" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'tutor:CourseStatus' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <ReferenceArrayInput reference="Theme" source="pair:hasTopic">
          <AutocompleteArrayInput optionText="pair:label" fullWidth />
        </ReferenceArrayInput>
      </FormTab>
      <FormTab label="Fiches">
        <ReferenceManyField
          addLabel={false}
          reference="Lesson"
          target="pair:partOf"
          sort={{ field: 'pair:label', order: 'ASC' }}
        >
          <CardsList CardComponent={LessonCard} link="edit" />
        </ReferenceManyField>
        <AddLessonButton />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default CourseEdit;
