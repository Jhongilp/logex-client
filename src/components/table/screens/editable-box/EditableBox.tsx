import React, { useEffect, useRef, useContext } from "react";
import {
  EditableBox as EditableBoxWrapper,
  TextBoxWrapper,
} from "components/table/styles/_table.styles";
import { PropertyType } from "types/table-type/table.types";
import { TableContext } from "components/table/Table";
import EditableSelectTypeBox from "components/table/screens/cells-type/editable-select-type-box/EditableSelectTypeBox";
import { useKeydownListener } from "components/table/hooks";

function setEndOfContenteditable(contentEditableElement: any) {
  let range, selection;
  if (document.createRange) {
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); //get the selection object (allows you to change selection)
    selection?.removeAllRanges(); //remove any selections already made
    selection?.addRange(range); //make the range you have just created the visible selection
  }
}

const TextTypeBox = () => {
  const ctx = useContext(TableContext);
  const { editableValue } = ctx;
  const editableBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editableBoxRef?.current) {
      editableBoxRef?.current?.focus?.();
      setEndOfContenteditable(editableBoxRef.current);
    }
  }, []);

  return (
    <TextBoxWrapper
      className="no-self-close editable-div-type-box"
      contentEditable
      ref={editableBoxRef}
      suppressContentEditableWarning={true}
    >
      {editableValue}
    </TextBoxWrapper>
  );
};

const PersonTypeBox = () => {
  return (
    <div>
      <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
      </ul>
    </div>
  );
};

const getBoxType = (type: PropertyType) => {
  switch (type) {
    case PropertyType.Text: {
      return <TextTypeBox />;
    }
    case PropertyType.Person: {
      return <PersonTypeBox />;
    }
    case PropertyType.Select: {
      return <EditableSelectTypeBox />;
    }
    // case PropertyType.Date: {
    //   return <EditableDateTypeBox row={}/>;
    // }
    default:
      return <TextTypeBox />;
  }
};

const EditableBox = () => {
  const ctx = useContext(TableContext);
  const { x, y, isVisible, width, columnType, onUpdateData } = ctx;

  useKeydownListener({
    onUpdateData,
    disabledListener: columnType !== PropertyType.Text,
  });

  return (
    <EditableBoxWrapper
      style={{
        top: y - 1,
        left: x - 3,
        display: isVisible ? "flex" : "none",
        width: width + 4,
      }}
    >
      {getBoxType(columnType)}
    </EditableBoxWrapper>
  );
};

export default EditableBox;
