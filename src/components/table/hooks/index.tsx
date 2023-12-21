import { useEffect } from "react";

type EditableSelectTypeBoxKeydownListenerProps = {
  onUpdateData?: ((newValue: string) => void | undefined) | undefined;
  onNewTagOption?: () => void;
  onEditTagOption?: () => void;
  disabledListener: boolean;
};

export const useKeydownListener = ({
  onUpdateData,
  onEditTagOption,
  onNewTagOption,
  disabledListener,
}: EditableSelectTypeBoxKeydownListenerProps) => {
  useEffect(() => {
    function handleOnKeyDown(this: Document, e: KeyboardEvent) {

      if (e.key === "Enter") {
        let target = e?.target as HTMLInputElement | HTMLDivElement;
        if (target?.closest?.("#new-tag-creation")) {
          onNewTagOption?.();
          return;
        }

        if (target?.closest?.("#tag-edition")) {
          onEditTagOption?.();
          return;
        }

        if (target?.closest?.(".editable-div-type-box")) {
          if (typeof target.innerText === "string") {
            let newValue = target.innerText;
            onUpdateData?.(newValue);
          }
        }
      }
    }

    if (!disabledListener) {
      document.addEventListener("keydown", handleOnKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
    };
  }, [onUpdateData, onNewTagOption, onEditTagOption, disabledListener]);
};
