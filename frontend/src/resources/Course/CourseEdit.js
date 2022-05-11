import React from 'react';
import { Edit, ImageInput, SelectInput, TextInput, SimpleForm } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import CourseTitle from './CourseTitle';
import { ImageField, ReferenceInput } from '@semapps/semantic-data-provider';

const CourseEdit = props => (
  <Edit title={<CourseTitle />} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" fullWidth />
      <TextInput source="pair:comment" fullWidth />
      <MarkdownInput multiline source="pair:description" fullWidth />
      <ImageInput source="pair:depictedBy" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'tutor:CourseStatus' }}>
        <SelectInput optionText="pair:label" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default CourseEdit;
