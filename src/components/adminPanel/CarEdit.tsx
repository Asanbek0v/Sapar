import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";

export const CarEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="brand" label="Марка" validate={required()} />
      <TextInput source="model" label="Модель" validate={required()} />
      <NumberInput source="year" label="Год" validate={required()} />
      <NumberInput source="price" label="Цена" validate={required()} />
      <NumberInput
        source="capacity"
        label="Вместимость"
        validate={required()}
      />
      <TextInput source="transmission" label="КПП" validate={required()} />
      <TextInput source="fuelType" label="Топливо" validate={required()} />
      <TextInput source="drive" label="Привод" validate={required()} />
      <NumberInput source="places" label="Мест" validate={required()} />
      <ArrayInput source="images" label="Фотографии (URL)">
        <SimpleFormIterator inline>
          <TextInput
            source=""
            label="URL изображения"
            helperText="Вставь ссылку на фото"
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
