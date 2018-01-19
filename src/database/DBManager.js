/* eslint no-underscore-dangle: 0 */
import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default class DBManager {
  static _db;
  static _queries = [];
  static _status = {
    opening: false,
    error: ""
  };
  static _openingPromise;

  static loadDB() {
    if (DBManager.isOpening() || DBManager._db) return;

    DBManager._status.opening = true;
    DBManager._openingPromise = SQLite.openDatabase({
      name: "lines",
      createFromLocation: "~lines_data.db",
      location: "Library"
    })
      .then(DBManager._dbOpenSuccess)
      .catch(DBManager._dbOpenFailure);
  }

  static _dbOpenSuccess = db => {
    console.log("DB Loaded!");
    DBManager._status.opening = false;
    DBManager._db = db;
  };

  static _dbOpenFailure = err => {
    console.error("DB Failure: ", err);
    DBManager._db = null;
    DBManager._status.opening = false;
    DBManager._status.error = err;
  };

  static getDBError() {
    return DBManager._status.error;
  }

  static isOpening() {
    return DBManager._status.opening;
  }

  static isOpened() {
    return !!DBManager._db;
  }

  static executeSQL(query, data = []) {
    if (!DBManager.isOpened()) {
      if (!DBManager.isOpening()) DBManager.loadDB();
      return DBManager._openingPromise.then(() =>
        DBManager.executeSQL(query, data)
      );
    }
    return DBManager._db.executeSql(query, data).then(([resp]) => resp);
  }

  static getItems(query, data = []) {
    return DBManager.executeSQL(query, data).then(resp => {
      const items = [];
      if (!resp || !resp.rows) return items;
      for (let i = 0; i < resp.rows.length; i++) {
        items.push(resp.rows.item(i));
      }
      return items;
    });
  }

  static addQuery(query, data = []) {
    DBManager._queries.push([query, data]);
  }

  static addQueries(queries) {
    if (Array.isArray(queries) && queries.length > 0) {
      DBManager._queries = [...DBManager._queries, ...queries];
    }
  }

  static executePendingQueries() {
    if (!DBManager.isOpened()) {
      if (!DBManager.isOpening()) DBManager.loadDB();
      return DBManager._openingPromise.then(() =>
        DBManager.executePendingQueries()
      );
    }
    if (!DBManager._queries.length) return Promise.resolve();
    return DBManager._db.sqlBatch(DBManager._queries).then(() => {
      DBManager._queries = [];
    });
  }
}
