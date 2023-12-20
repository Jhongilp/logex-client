import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { ExpoStatus } from "types";
import { ExpoList, StateType } from "types/props.types";

import { createExpo } from "api/exportaciones.api";
import { getCompanyExpoDefaultActivities } from "api/settings.api";
import { IExpo } from "types";
import { BtnIcon, ButtonAct } from "styles/commons";
import { List } from "styles/List/list.styles";
import { CloseIcon } from "svgs";

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
  > div.expo-customer {
    grid-area: 1 / 1 / 2 / 6;
    position: relative;
  }
  > div.expo-consecutivo {
    grid-area: 2 / 1 / 3 / 6;
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

type ExpoFilteredListProps = {
  list: string[];
  onSelect: (e: React.MouseEvent) => void;
};

const ExpoFilteredList: FC<ExpoFilteredListProps> = ({ list, onSelect }) => {
  return (
    <StyledFilteredList>
      <List>
        {list.map((expoId) => (
          <li key={expoId} id={expoId} onMouseDown={onSelect}>
            {expoId}
          </li>
        ))}
      </List>
    </StyledFilteredList>
  );
};

const CreateExpoForm: FC<CreateCustomerProps> = ({ onClose }) => {
  const [error] = useState(false);

  const [consecutivo, setConsecutivo] = useState("");
  const [expoId, setExpoId] = useState("");
  const [expoIdFilteredList, setExpoList] = useState<string[]>([]);
  const [isFiltering, setFiltering] = useState(false);
  const [selectedExpoToClone, setExpoToClone] = useState<IExpo | null>(null);

  const exportaciones: ExpoList = useSelector(
    (state: StateType) => state.exportaciones
  );

  const onCreateExpo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const expoActivitiesList = await getCompanyExpoDefaultActivities();

    if (selectedExpoToClone && consecutivo) {
      console.log("on clone expo...");
      selectedExpoToClone.consecutivo = consecutivo;
      selectedExpoToClone.status = ExpoStatus.PrevioCargue;
      selectedExpoToClone.globalProgress = 0;
      selectedExpoToClone.stagesProgress = [];
      selectedExpoToClone.createdAt = Date.now();
      selectedExpoToClone.todo_list = expoActivitiesList;

      createExpo(selectedExpoToClone).then(() => {
        onClose();
      });
    }
  };

  const handleOnExpoChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    const findExpo = (exportaciones: ExpoList, query: string): string[] => {
      const results = Object.keys(exportaciones).filter((expoId) => {
        return expoId.toLowerCase().includes(query.toLowerCase());
      });
      return results;
    };

    const results = findExpo(exportaciones, value);
    console.log("results EXPO IDS: ", results);
    setExpoId(value);
    setExpoList(results);
  };

  const handleOnSelectExpo = (e: React.MouseEvent) => {
    const expoId = e.currentTarget.id;
    console.log("selected expo ID: ", expoId);
    const expoToClone = exportaciones[expoId];
    if (expoToClone) {
      const cloneExpo = { ...expoToClone };
      console.log("expo to clone: ", cloneExpo);
      setExpoId(expoId);
      setExpoToClone(expoToClone);
      setFiltering(false);
    }
  };

  return (
    <ExpoFormWrapper>
      <CloseFormIconWrapper>
        <BtnIcon type="button" onClick={onClose}>
          <CloseIcon />
        </BtnIcon>
      </CloseFormIconWrapper>
      <FormHeader>
        <h3>Clonar exportación</h3>
      </FormHeader>

      <ExpoForm id="create-expo-form" onSubmit={onCreateExpo}>
        <div className="form-field expo-customer">
          <label>Buscar consecutivo de exportación a clonar</label>
          <input
            onFocus={() => setFiltering(true)}
            onBlur={() => setFiltering(false)}
            value={expoId}
            onChange={handleOnExpoChange}
            required
          ></input>
          {isFiltering && expoIdFilteredList.length > 0 && (
            <ExpoFilteredList
              list={expoIdFilteredList}
              onSelect={handleOnSelectExpo}
            />
          )}
        </div>
        <div className="form-field expo-consecutivo">
          <label>Nuevo consecutivo </label>
          <input
            value={consecutivo}
            onChange={(e) => setConsecutivo(e.currentTarget.value)}
            required
            min={4}
            // pattern="(EXP-)[0-9]"
            placeholder="EXP-"
          ></input>
        </div>
      </ExpoForm>

      <FormCommands>
        <ButtonAct onClick={onClose}>Cancelar</ButtonAct>
        <ButtonAct form="create-expo-form">Clonar exportación</ButtonAct>
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
