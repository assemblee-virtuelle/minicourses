import React from 'react';
import { ImageInput, SelectInput, TextInput, TabbedForm, FormTab, ReferenceManyField } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField, ReferenceInput } from '@semapps/semantic-data-provider';
import CourseTitle from './CourseTitle';
import Edit from '../../layout/Edit';
import AddLessonButton from "../../buttons/AddLessonButton";
import CardsList from "../../layout/CardsList";
import LessonCard from "../Lesson/LessonCard";

const CourseEdit = props => (
  <Edit title={<CourseTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Description">
        <TextInput source="pair:label" fullWidth />
        <TextInput source="pair:comment" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <ImageInput source="pair:depictedBy" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'tutor:CourseStatus' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
      </FormTab>
      <FormTab label="Fiches">
        <ReferenceManyField
          addLabel={false}
          reference="Lesson"
          target="pair:partOf"
          sort={{ field: 'pair:label', order: 'DESC' }}
        >
          <CardsList CardComponent={LessonCard} link="edit" />
        </ReferenceManyField>
        <AddLessonButton />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default CourseEdit;
