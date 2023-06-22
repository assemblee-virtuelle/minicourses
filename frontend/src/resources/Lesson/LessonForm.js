import React from "react";
import { ImageInput, SimpleForm, TextInput, NumberInput, required, ImageField } from "react-admin";
import { MarkdownInput } from '@semapps/markdown-components';

const LessonForm = (props) => {
  const redirect = props.mode === 'edit'
    ? props.record['pair:partOf'] ? `/Course/${encodeURIComponent(props.record['pair:partOf'])}/1` : 'show'
    : props.redirect;

  return (
    <SimpleForm {...props} redirect={redirect}>
      <TextInput source="pair:label" fullWidth validate={required()} />
      <MarkdownInput multiline source="pair:description" fullWidth validate={required()} />
      <ImageInput source="pair:depictedBy" accept="image/*" helperText="Si vous attachez une vidéo, vous devriez inclure une icône de type |> car, en cliquant dessus, l'utilisateur ira sur la vidéo">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="tutor:video" fullWidth helperText="Lien YouTube, Peertube, DailyMotion, etc." />
      <NumberInput source="tutor:duration" fullWidth validate={required()} />
      {props.mode === 'edit' &&
        <NumberInput source="tutor:order" fullWidth />
      }
    </SimpleForm>
  );
}

export default LessonForm;
