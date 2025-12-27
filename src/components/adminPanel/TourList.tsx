import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  ImageField,
} from "react-admin";

export const TourList = () => (
  <List>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="description" label="Описание" />
      <TextField source="city" label="Город" />
      <TextField source="category" label="Категория" />
      <NumberField source="price" label="Цена" />
      <NumberField source="duration" label="Длительность (дней)" />
      <NumberField source="maxPeople" label="Макс. людей" />
      <TextField source="date" label="Дата" />
      <ImageField source="images[0]" label="Фото" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
