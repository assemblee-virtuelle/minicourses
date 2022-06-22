import React from "react";
import { ImageInput, SimpleForm, TextInput, NumberInput } from "react-admin";
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/semantic-data-provider';

const LessonForm = (props) => {
  const redirect = props.mode === 'edit'
    ? props.record['pair:partOf'] ? `/Course/${encodeURIComponent(props.record['pair:partOf'])}/1` : 'show'
    : props.redirect;

  return (
    <SimpleForm {...props} redirect={redirect}>
      <TextInput source="pair:label" fullWidth />
      <MarkdownInput multiline source="pair:description" fullWidth />
      <ImageInput source="pair:depictedBy" accept="image/*" helperText="Si vous attachez une vidéo, vous devriez inclure une icône de type |> car, en cliquant dessus, l'utilisateur ira sur la vidéo">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="tutor:video" fullWidth helperText="Lien YouTube, Peertube, DailyMotion, etc." />
      <NumberInput source="tutor:duration" fullWidth />
      <NumberInput source="tutor:order" fullWidth />
    </SimpleForm>
  );
}

export default LessonForm;
