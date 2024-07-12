import { useState } from "react";
import { useAppSelector } from "hooks/store.hooks";
import styled from "styled-components";

import {
  ICliente,
  IExpo,
  IExpoInput,
  IShipping,
} from "types";
import { CustomerList } from "types/props.types";

import { BtnIcon, ButtonAct } from "styles/commons";
import { List } from "styles/List/list.styles";
import { CloseIcon } from "svgs";
import { AddIcon } from "svgs";
import { SelectableShippingList } from "components/customer/shippings/screens/selectable-shipping-list/SelectableShippingList";

import {
  FormWrapper,
  FormHeader,
  StyledForm,
  CloseFormIconWrapper,
  FormCommands,
} from "styles/Form/form.styles";
import { useMutation, useQuery } from "urql";
import { CreateExpoMutation, CustomerQuery, ShippingsQuery } from "api";

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
  customers: ICliente[];
  onSelect: (customer: ICliente) => void;
};

const CustomerFilteredList = ({
  customers,
  onSelect,
}: CustomerFilteredListProps) => {
  return (
    <StyledFilteredList>
      <List>
        {customers.map((customer) => (
          <li
            key={customer.id}
            id={`${customer.id}`}
            onMouseDown={() => onSelect(customer)}
          >
            {customer.name}
          </li>
        ))}
      </List>
    </StyledFilteredList>
  );
};

const CreateExpoForm = ({ onClose }: CreateCustomerProps) => {
  const [, createExpo] = useMutation<{ expo: IExpo }>(CreateExpoMutation);
  const [selectedShippingId, setSelectShippingId] = useState<string | null>(
    null
  );

  const [consecutivo, setConsecutivo] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<ICliente | null>(
    null
  );
  const [customerFilteredList, setCustomerList] = useState<ICliente[]>([]); // filtered list based on input type
  const [isFiltering, setFiltering] = useState(false);
  const [error] = useState(false);
  useQuery<{ customers: ICliente[] }>({
    query: CustomerQuery,
  });
  const [shippingResults] = useQuery<{ shippings: IShipping[] }>({
    query: ShippingsQuery,
    variables: { customerId: selectedCustomer?.id },
  });
  const customers = useAppSelector((state) => state.customers);

  const onCreateExpo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const expoActivitiesList = await getCompanyExpoDefaultActivities();
    // const expoActivitiesList = [];

    const expo: IExpoInput = {
      consecutivo,
      customerId: selectedCustomer.id,
      shippingId: "",
      // status: 0, // !don't think we need to pass this
      globalProgress: 0,
      // stagesProgress: [],
      // todo_list: expoActivitiesList,
    };

    if (selectedShippingId) {
      expo.shippingId = selectedShippingId;
    }
    console.log("[onCreateExpo] expo: ", expo);
    createExpo({ input: expo })
      .then((res) => {
        console.log("[expo] res on create: ", res);
        onClose();
      })
      .catch((error) => {
        console.log("Error creating the new expo: ", error);
      });
  };

  const handleOnCustomerName = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    const findCustomer = (
      customers: CustomerList,
      query: string
    ): ICliente[] => {
      const results = customers.filter((customer) => {
        return customer.name.toLowerCase().includes(query.toLowerCase());
      });
      return results;
    };

    const results = findCustomer(customers, value);
    console.log("results: ", results);
    setCustomerList(results);
  };

  const handleOnSelectCustomer = (selectedCustomer) => {
    setSelectedCustomer(selectedCustomer);
    setFiltering(false);
  };

  // const showCustomerShippings = (customerId: string) => {
  //   getShippingList(customerId)
  //     .then((data) => {
  //       setShippings(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching shippings from this customer. ", error);
  //     });
  // };

  const handleOnSelectShipping = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    console.log("ON SELECT ID:", e.currentTarget.id);
    setSelectShippingId(e.currentTarget.id);
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
        <div className="form-field expo-customer">
          <label>Cliente</label>
          <input
            onFocus={() => setFiltering(true)}
            onBlur={() => setFiltering(false)}
            value={selectedCustomer?.name ?? ""}
            onChange={handleOnCustomerName}
            required
          ></input>
          {isFiltering && customerFilteredList.length > 0 && (
            <CustomerFilteredList
              customers={customers}
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

      {shippingResults?.data?.shippings?.length > 0 && (
        <SelectableShippingList
          shippings={shippingResults.data.shippings}
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
