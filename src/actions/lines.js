import { getAllUpdatedAt, updateAll } from "../database/lines";
import { getLines, getLine } from "../extractors";
import { LINES_UPDATED } from "../constants/types";

const linesUpdated = () => ({
  type: LINES_UPDATED
});

export const updateLines = () => async dispatch => {
  const [oldData, lines] = await Promise.all([getAllUpdatedAt(), getLines()]);
  const lists = {
    toUpdate: [],
    toAdd: [],
    toDelete: []
  };

  await Promise.all(
    Object.values(lines).map(async line => {
      const old = oldData[line.cod] || {};
      let data = await getLine(line.cod, old.updated_at);
      if (data.updated_at) {
        data = { ...data, ...line };

        if (oldData[line.cod]) {
          lists.toUpdate.push(data);
          delete oldData[line.cod];
        } else {
          lists.toAdd.push(data);
        }
      } else if (oldData[line.cod]) {
        delete oldData[line.cod];
      }
    })
  );

  const remainingKeys = Object.keys(oldData);
  if (remainingKeys.length > 0) lists.toDelete = remainingKeys;

  await updateAll(lists);
  dispatch(linesUpdated());

  return {
    toAdd: lists.toAdd.length,
    toUpdate: lists.toUpdate.length,
    toDelete: lists.toDelete.length
  };
};
