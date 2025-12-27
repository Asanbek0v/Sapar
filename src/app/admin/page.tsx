"use client";

import { Admin, Resource } from "react-admin";
import { dataProvider } from "../../lib/dataProvider";
import { authProvider } from "../../lib/authProvider";
import { useEffect, useState } from "react";

import { TourList } from "../../components/adminPanel/TourList";
import { TourEdit } from "../../components/adminPanel/TourEdit";
import { TourCreate } from "../../components/adminPanel/TourCreate";

import { CarList } from "../../components/adminPanel/CarList";
import { CarEdit } from "../../components/adminPanel/CarEdit";
import { CarCreate } from "../../components/adminPanel/CarCreate";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="tours"
        list={TourList}
        edit={TourEdit}
        create={TourCreate}
      />
      <Resource name="cars" list={CarList} edit={CarEdit} create={CarCreate} />
    </Admin>
  );
}
