import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    required,
    ArrayInput,
    SimpleFormIterator,
  } from "react-admin";
  
  export const TourEdit = () => (
    <Edit>
      <SimpleForm>
        <TextInput source="name" label="Название" validate={required()} />
        <TextInput
          source="description"
          label="Описание"
          multiline
          rows={4}
          validate={required()}
        />
        <TextInput source="city" label="Город" validate={required()} />
        <TextInput source="category" label="Категория" validate={required()} />
        <NumberInput source="price" label="Цена" validate={required()} />
        <NumberInput
          source="duration"
          label="Длительность (дней)"
          validate={required()}
        />
        <NumberInput
          source="maxPeople"
          label="Макс. людей"
          validate={required()}
        />
        <TextInput source="date" label="Дата" validate={required()} />
        
        {/* Редактирование фоток */}
        <ArrayInput source="images" label="Фотографии (URL)">
          <SimpleFormIterator inline>
            <TextInput source="" label="URL изображения" helperText="Вставь ссылку на фото" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );