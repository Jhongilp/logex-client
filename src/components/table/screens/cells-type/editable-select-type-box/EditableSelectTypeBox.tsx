import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import { SelectTypeBoxOptionTagList } from "types/table-type/table.types";
import { TableContext } from "components/table/Table";
import { BtnIcon } from "styles/commons";
import { CloseIcon, DragIcon, MoreHorizontal, DeleteIcon } from "svgs";
import { searchFromOptionList } from "utils";
import { useKeydownListener } from "components/table/hooks";
import { EditableBox as MoreOptionModal } from "components/table/styles/_table.styles";
import { uuid } from "utils";
import DeleteConfirmationModal from "components/table/screens/cells-type/editable-select-type-box/DeleteConfirmationModal";

import {
  ResetOptionBtnIcon,
  MoreOptionBtnIcon,
  EditableSelectWrapper,
  OptionList,
  CurrentSelection,
  TagEdition,
  OptionTag,
  InputField,
} from "components/table/screens/cells-type/editable-select-type-box/editableSelectTypebox.style";

const doesTagExists = (
  columnOptions: SelectTypeBoxOptionTagList,
  valueToUpdate: string
) =>
  columnOptions.some(
    (option) => option.label.toLowerCase() === valueToUpdate.toLowerCase()
  );

const EditableSelectTypeBox = () => {
  const ctx = useContext(TableContext);
  const {
    selectionOptionLists,
    columnName,
    editableValue,
    onUpdateData,
    onUpdateSelectionOptionList,
  } = ctx;

  const [modalOptionSetup, setOptionModalSetup] = useState({
    isMoreOptionModalEnable: false,
    x: 0,
    y: 0,
    id: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [isDeleteModalActive, setDeleteModal] = useState(false);
  const [isCurrentValueTagEnabled, setCurrentValueTagEnabled] = useState(true);

  const [query, setQuery] = useState("");
  const queryRef = useRef(query);
  const selectedOptionRef = useRef(selectedOption);
  useEffect(() => {
    queryRef.current = query;
    selectedOptionRef.current = selectedOption;
  });

  const handleOnNewSelectOptionTag = useCallback(
    (_newValue?: string) => {
      if (columnName) {
        const isColumnEditable = selectionOptionLists[columnName].editable;
        if (isColumnEditable) {
          const columnOptions = [...selectionOptionLists[columnName].data];
          const valueToUpdate = queryRef.current;
          const doesTagExistAlready = doesTagExists(
            columnOptions,
            valueToUpdate
          );

          if (!doesTagExistAlready) {
            columnOptions.push({
              label: valueToUpdate.toUpperCase(),
              color: "",
              id: uuid(),
              deletable: true,
              editable: true,
            });
            onUpdateSelectionOptionList?.(columnOptions);
          }
          onUpdateData?.(queryRef.current.toUpperCase());
        }
      }
    },
    [
      onUpdateData,
      onUpdateSelectionOptionList,
      columnName,
      selectionOptionLists,
    ]
  );

  const handleOnEditSelectOptionTag = useCallback(() => {
    if (columnName) {
      const columnOptions = [...selectionOptionLists[columnName].data];
      const valueToUpdate = selectedOptionRef.current;
      const doesTagExistAlready = doesTagExists(columnOptions, valueToUpdate);

      if (valueToUpdate && !doesTagExistAlready) {
        const tagOptionToUpdate = columnOptions.find(
          (option) => option.id === modalOptionSetup.id
        );
        if (tagOptionToUpdate) {
          tagOptionToUpdate.label = selectedOptionRef.current.toUpperCase();
          onUpdateSelectionOptionList?.(columnOptions);
        }
      }
    }
    setOptionModalSetup((state) => ({
      ...state,
      isMoreOptionModalEnable: false,
    }));
  }, [
    columnName,
    onUpdateSelectionOptionList,
    selectionOptionLists,
    modalOptionSetup.id,
  ]);

  useKeydownListener({
    onNewTagOption: handleOnNewSelectOptionTag,
    onEditTagOption: handleOnEditSelectOptionTag,
    disabledListener: false,
  });

  const handleOnClickMore = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tagLabel: string
  ) => {
    const { x, y } = e.currentTarget.getBoundingClientRect();
    setSelectedOption(tagLabel);
    setOptionModalSetup({
      isMoreOptionModalEnable: true,
      x,
      y,
      id: e.currentTarget.id,
    });
    e.stopPropagation();
  };

  const handleOnConfirmDeleteOption = () => {
    if (columnName) {
      const columnOptions = [...selectionOptionLists[columnName].data];
      const tagOptionIndex = columnOptions.findIndex(
        (option) => option.id === modalOptionSetup.id
      );
      columnOptions.splice(tagOptionIndex, 1);
      onUpdateSelectionOptionList?.(columnOptions);
    }
    setOptionModalSetup((state) => ({
      ...state,
      isMoreOptionModalEnable: false,
    }));
    setDeleteModal(false);
  };

  const handleClearCurrentSelection = () => {
    setCurrentValueTagEnabled(false);
    onUpdateData?.("");
  };

  let columnOptions: SelectTypeBoxOptionTagList = [];
  let isColumnEditable = true;
  if (columnName) {
    columnOptions = selectionOptionLists[columnName].data || [];
    isColumnEditable = selectionOptionLists[columnName].editable;
  }
  const searchResults = searchFromOptionList(columnOptions, query);
  const { isMoreOptionModalEnable, x, y } = modalOptionSetup;

  return (
    <EditableSelectWrapper>
      <CurrentSelection>
        {isCurrentValueTagEnabled && editableValue && (
          <OptionTag>
            <span>{editableValue}</span>
            <ResetOptionBtnIcon onClick={handleClearCurrentSelection}>
              <CloseIcon />
            </ResetOptionBtnIcon>
          </OptionTag>
        )}
        <InputField>
          <input
            id="new-tag-creation"
            autoFocus
            onChange={(e) => setQuery(e.currentTarget.value)}
          ></input>
        </InputField>
      </CurrentSelection>
      <span>Escoja una opción</span>
      <OptionList>
        {searchResults.map((option) => (
          <li
            key={option.id}
            onClick={(e) => onUpdateData?.(option.label.toUpperCase())}
          >
            <DragIcon />
            <OptionTag>
              <span>{option.label}</span>
            </OptionTag>

            {isColumnEditable && (option.editable || option.deletable) && (
              <MoreOptionBtnIcon
                id={option.id}
                onClick={(e) =>
                  handleOnClickMore(e, option.label.toUpperCase())
                }
              >
                <MoreHorizontal />
              </MoreOptionBtnIcon>
            )}
          </li>
        ))}

        {isColumnEditable && query && (
          <li key="new-option" onClick={() => handleOnNewSelectOptionTag()}>
            <span className="create-option-text">Create </span>
            <OptionTag>
              <span>{query}</span>
            </OptionTag>
          </li>
        )}
        {isMoreOptionModalEnable && (
          <MoreOptionModal
            style={{
              top: y - 1,
              left: x + 30,
              height: 85,
            }}
          >
            <TagEdition className="tag-edition-modal">
              <div className="edition">
                <input
                  id="tag-edition"
                  autoFocus
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.currentTarget.value)}
                ></input>
              </div>
              <div className="delete">
                <BtnIcon onClick={() => setDeleteModal(true)}>
                  <DeleteIcon />
                  Delete
                </BtnIcon>
              </div>
            </TagEdition>
          </MoreOptionModal>
        )}
      </OptionList>

      {isDeleteModalActive && (
        <DeleteConfirmationModal
          onDelete={handleOnConfirmDeleteOption}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </EditableSelectWrapper>
  );
};

export default EditableSelectTypeBox;
