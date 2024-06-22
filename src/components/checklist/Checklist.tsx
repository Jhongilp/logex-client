import { FC, useState, useCallback } from "react";
// import { updateTodoItemProgress } from "api/exportaciones.api";
import { ChecklistStyled, ChecklistWrapper } from "./_checklist";
import {
  ExpoActivityList,
  IExpoActivitiesSettings,
  ProgressStatus,
  ExpoStatus,
} from "types";
import { UpdateExpoProgressProps } from "types/props.types";
import { PropertyType, IColumn } from "types/table-type/table.types";

import Table from "components/table/Table";
import TodoItem from "components/checklist/screens/todo-item/TodoItem";
import { getStagesProgress } from "components/checkpoint/CheckPoint";

type ChecklistProps = {
  list: ExpoActivityList;
  expoId: string;
  expoStageFilter: ExpoStatus;
};

const columns: IColumn<IExpoActivitiesSettings>[] = [
  {
    type: PropertyType.Text,
    name: "Actividad",
    fieldName: "name",
  },
  {
    type: PropertyType.Person,
    name: "Responsable",
    fieldName: "responsible",
  },
  {
    type: PropertyType.Progress,
    name: "Estado",
    fieldName: "progress",
  },
  {
    type: PropertyType.Date,
    name: "Deadline",
    fieldName: "deadline",
  },
];

const Checklist: FC<ChecklistProps> = ({ list, expoId, expoStageFilter }) => {
  const [item, setItem] = useState<IExpoActivitiesSettings | null>(null);
  const [todoItemId, setTodoItemId] = useState<string | null>(null);
  const handleOnOpen = useCallback(
    (todoItemId: string) => {
      const listItemIndex = list.findIndex(
        (todoItem) => todoItem.id === todoItemId
      );
      const item = list[listItemIndex];
      if (item) {
        setItem(item);
        setTodoItemId(todoItemId);
      }
    },
    [list]
  );

  const handleOnUpdateProgress = useCallback(
    (progressStatus: ProgressStatus) => {
      const clone = [...list];
      if (todoItemId) {
        const listItemIndex = clone.findIndex(
          (todoItem) => todoItem.id === todoItemId
        );
        const item = clone[listItemIndex];
        item.progress = progressStatus;
        const { globalProgress, currentExpoStage } = getStagesProgress(clone);
        const data: UpdateExpoProgressProps = {
          todo_list: clone,
          globalProgress,
          status: currentExpoStage,
        };
        // updateTodoItemProgress(expoId, data).then(() => {
        //   setItem(null);
        //   setTodoItemId(null);
        // });
      }
    },
    [expoId, list, todoItemId]
  );

  const handleDelete = () => {
    const clone = [...list];
    if (todoItemId) {
      const listItemIndex = clone.findIndex(
        (todoItem) => todoItem.id === todoItemId
      );

      clone.splice(listItemIndex, 1);

      const { globalProgress, currentExpoStage } = getStagesProgress(clone);

      console.log("[todo list] ", clone, globalProgress, currentExpoStage);
      const data: UpdateExpoProgressProps = {
        todo_list: clone,
        globalProgress,
        status: currentExpoStage,
      };
      // updateTodoItemProgress(expoId, data).then(() => {
      //   setItem(null);
      //   setTodoItemId(null);
      // });
    }
  };

  const todoListFiltered = list.filter?.((todo) => {
    return todo.status === expoStageFilter;
  });

  return (
    <ChecklistStyled>
      {item && (
        <TodoItem
          item={item}
          onClose={() => setItem(null)}
          onUpdateProgress={handleOnUpdateProgress}
          onDelete={handleDelete}
        />
      )}

      <ChecklistWrapper>
        <Table
          tableName="checklist_table"
          columns={columns}
          rows={todoListFiltered}
          onSelection={handleOnOpen}
        />
      </ChecklistWrapper>
    </ChecklistStyled>
  );
};

export default Checklist;
