import React from "react";
import { ImageInput, SimpleForm, TextInput } from "react-admin";
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/semantic-data-provider';

const LessonForm = (props) => (
  <SimpleForm {...props}>
    <TextInput source="pair:label" fullWidth />
    <TextInput source="pair:comment" fullWidth />
    <MarkdownInput multiline source="pair:description" fullWidth />
    <ImageInput source="pair:depictedBy" accept="image/*">
      <ImageField source="src" />
    </ImageInput>
  </SimpleForm>
);

export default LessonForm;
