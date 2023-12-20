import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { ExpoStatus } from 'types';
import { StateType, CustomerList, ShippingList } from "types/props.types";

import { getShippingList } from "api/customers.api";
import { createExpo } from 'api/exportaciones.api';
import { getCompanyExpoDefaultActivities } from 'api/settings.api'
import { IExpo, ModoTransporte } from "types";
import { BtnIcon, ButtonAct } from "styles/commons";
import { List } from "styles/List/list.styles";
import { CloseIcon } from "svgs";
import { AddIcon } from "svgs";
import SelectableShippingList from "components/shippings/selectable-shipping-list/SelectableShippingList";

import {
  FormWrapper,
  FormHeader,
  StyledForm,
  CloseFormIconWrapper,
  FormCommands,
} from "styles/Form/form.styles";

const ExpoFormWrapper = styled(FormWrapper)`
  min-height: 300px;
`;

const ExpoForm = styled(StyledForm)`
  > div.expo-consecutivo {
    grid-area: 1 / 1 / 2 / 4;
  }
  > div.expo-transport-mode {
    grid-area: 1 / 4 / 2 / 7;

    > select {
      height: 35px;
    }
  }
  > div.expo-customer {
    grid-area: 2 / 1 / 3 / 7;
    position: relative;
  }
  > div.expo-purchase-order {
    grid-area: 2 / 7 / 3 / 11;
    > div {
      display: flex;
      align-items: center;

      > input {
        width: 100px;
        margin-right: 6px;
        height: 35px;
        border: none;
        background-color: var(--color-main-bg);
        /* padding: 0 0 0 12px; */
      }
      > button {
        width: 35px;
        height: 35px;
      }
    }
  }
`;

const StyledFilteredList = styled.div`
  position: absolute;
  display: flex;
  top: 100%;
  left: 0;
  width: calc(100% - 12px);
  padding: 6px;
  background-color: var(--color-main);
  box-shadow: 2px 3px 6px 0px rgba(58, 58, 62, 0.7);
  z-index: 10;

  > ul {
    font-family: "Roboto";
    font-size: 14px;
  }
`;

type CreateCustomerProps = {
  onClose: () => void;
};

type CustomerFilteredListProps = {
  customers: CustomerList;
  list: string[];
  onSelect: (e: React.MouseEvent) => void;
};

const CustomerFilteredList: FC<CustomerFilteredListProps> = ({
  customers,
  list,
  onSelect,
}) => {
  return (
    <StyledFilteredList>
      <List>
        {list.map((customerId) => (
          <li key={customerId} id={customerId} onMouseDown={onSelect}>
            {customers[customerId].name}
          </li>
        ))}
      </List>
    </StyledFilteredList>
  );
};

const CreateExpoForm: FC<CreateCustomerProps> = ({ onClose }) => {
  const [error] = useState(false);

  const [selectedShipping, setSelectShipping] = useState<string | null>(null);
  const [shippings, setShippings] = useState<ShippingList>({});
  const [consecutivo, setConsecutivo] = useState("");
  const [transportMode, setTransportMode] = useState(ModoTransporte.MARITIMO);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerIdFilteredList, setCustomerList] = useState<string[]>([]);
  const [isFiltering, setFiltering] = useState(false);

  const customers: CustomerList = useSelector(
    (state: StateType) => state.customers
  );

  const onCreateExpo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const expoActivitiesList = await getCompanyExpoDefaultActivities();

    const expo: IExpo = {
      // id: "", // add later with Firestore
      consecutivo,
      customer_id: customerId,
      transport_mode: transportMode,
      customer_name: customerName,
      status: ExpoStatus.PrevioCargue,
      globalProgress: 0,
      stagesProgress: [],
      createdAt: Date.now(),
      todo_list: expoActivitiesList,
    };

    if(selectedShipping) {
      const shipping = shippings[selectedShipping];
      expo.selected_shipping = selectedShipping;
      expo.destination_country = shipping.country;
      expo.puerto_destino = shipping.city;
    }
    console.log("[createCustomer] expo: ", expo);
    createExpo(expo).then(() => {
      onClose();
    });
  };

  const handleOnSelectMode = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as ModoTransporte;
    setTransportMode(value);
  };

  const handleOnCustomerName = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    const findCustomer = (customers: CustomerList, query: string): string[] => {
      const results = Object.keys(customers).filter((customer) => {
        return customers[customer].name
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      return results;
    };

    const results = findCustomer(customers, value);
    console.log("results: ", results);
    setCustomerName(value);
    setCustomerList(results);
  };

  const handleOnSelectCustomer = (e: React.MouseEvent) => {
    const customerId = e.currentTarget.id;
    setCustomerId(customerId);
    setCustomerName(customers[customerId].name);
    setFiltering(false);
    showCustomerShippings(customerId);
  };

  const showCustomerShippings = (customerId: string) => {
    getShippingList(customerId)
      .then((data) => {
        setShippings(data);
      })
      .catch((error) => {
        console.log("Error fetching shippings from this customer. ", error);
      });
  };

  const handleOnSelectShipping = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    console.log("ON SELECT ID:", e.currentTarget.id);
    setSelectShipping(e.currentTarget.id);
  };

  return (
    <ExpoFormWrapper>
      <CloseFormIconWrapper>
        <BtnIcon type="button" onClick={onClose}>
          <CloseIcon />
        </BtnIcon>
      </CloseFormIconWrapper>
      <FormHeader>
        <h3>Crear exportación</h3>
      </FormHeader>

      <ExpoForm id="create-expo-form" onSubmit={onCreateExpo}>
        <div className="form-field expo-consecutivo">
          <label>Consecutivo</label>
          <input
            value={consecutivo}
            onChange={(e) => setConsecutivo(e.currentTarget.value)}
            required
            min={4}
            // pattern="(EXP-)[0-9]"
            placeholder="EXP-"
          ></input>
        </div>
        <div className="form-field expo-transport-mode">
          <label>Modalidad</label>
          <select required value={transportMode} onChange={handleOnSelectMode}>
            <option value={ModoTransporte.AEREO}>Aereo</option>
            <option value={ModoTransporte.MARITIMO}>Marítimo</option>
            <option value={ModoTransporte.TERRESTRE}>Terrestre</option>
          </select>
        </div>
        <div className="form-field expo-customer">
          <label>Cliente</label>
          <input
            onFocus={() => setFiltering(true)}
            onBlur={() => setFiltering(false)}
            value={customerName}
            onChange={handleOnCustomerName}
            required
          ></input>
          {isFiltering && customerIdFilteredList.length > 0 && (
            <CustomerFilteredList
              customers={customers}
              list={customerIdFilteredList}
              onSelect={handleOnSelectCustomer}
            />
          )}
        </div>
        <div className="form-field expo-purchase-order">
          <label>Ordern de compra</label>
          <div>
            <input disabled></input>
            <BtnIcon type="button">
              <AddIcon />
            </BtnIcon>
          </div>
        </div>
      </ExpoForm>

      {Object.keys(shippings).length > 0 && (
        <SelectableShippingList
          shippings={shippings}
          onSelectShipping={handleOnSelectShipping}
        />
      )}

      <FormCommands>
        <ButtonAct onClick={onClose}>Cancelar</ButtonAct>
        <ButtonAct form="create-expo-form">Crear exportación</ButtonAct>
      </FormCommands>
      {error && (
        <div>
          <span>No se presentó un error. Por favor volver a intentar</span>
        </div>
      )}
    </ExpoFormWrapper>
  );
};

export default CreateExpoForm;
