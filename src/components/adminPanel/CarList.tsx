import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  ImageField,
} from "react-admin";

export const CarList = () => (
  <List>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="brand" label="Марка" />
      <TextField source="model" label="Модель" />
      <NumberField source="year" label="Год" />
      <NumberField source="price" label="Цена" />
      <NumberField source="capacity" label="Вместимость" />
      <TextField source="transmission" label="КПП" />
      <TextField source="fuelType" label="Топливо" />
      <TextField source="drive" label="Привод" />
      <NumberField source="places" label="Мест" />
      <ImageField source="images[0]" label="Фото" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
