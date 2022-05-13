import React from "react";
import { ImageInput, SimpleForm, TextInput, NumberInput } from "react-admin";
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/semantic-data-provider';

const LessonForm = (props) => {
  const redirect = props.mode === 'edit'
    ? props.record['pair:partOf'] ? `/Course/${encodeURIComponent(props.record['pair:partOf'])}/1` : 'show'
    : undefined;

  return (
    <SimpleForm {...props} redirect={redirect}>
      <TextInput source="pair:label" fullWidth />
      <TextInput source="pair:comment" fullWidth />
      <MarkdownInput multiline source="pair:description" fullWidth />
      <ImageInput source="pair:depictedBy" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      <NumberInput source="tutor:duration" fullWidth />
      <NumberInput source="tutor:order" fullWidth />
    </SimpleForm>
  );
}

export default LessonForm;
