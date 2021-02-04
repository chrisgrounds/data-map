import { test } from "@jest/globals";
import DataMap, { Nothing } from "./index.js";

describe("DataMap", () => {
  describe("size", () => {
    test("if dataMap, returns 0", () => {
      const dataMap = new DataMap();

      expect(dataMap.size()).toBe(0);
    });

    test("if 1 item, returns 1", () => {
      const dataMap = new DataMap([[1, 2]]);

      expect(dataMap.size()).toBe(1);
    });

    test("if 2 items, returns 2", () => {
      const dataMap = new DataMap([[1, 2], [3, 4]]);

      expect(dataMap.size()).toBe(2);
    });

    test("if map has two itential items, returns 1", () => {
      const dataMap = new DataMap([[1, 2], [1, 2]]);

      expect(dataMap.size()).toBe(1);
    });

    test("if 3 items, returns 3", () => {
      const dataMap = new DataMap([[1, 2], [3, 4], [5, 6]]);

      expect(dataMap.size()).toBe(3);
    });
  });

  describe("lookup", () => {
    test("if dataMap, return Nothing", () => {
      const dataMap = new DataMap();

      expect(dataMap.lookup("a")).toBeInstanceOf(Nothing);
    });

    test("if no match, return Nothing", () => {
      const dataMap = new DataMap([["b", 2]]);

      expect(dataMap.lookup("a")).toBeInstanceOf(Nothing);
    });

    test("if match, return value", () => {
      const dataMap = new DataMap([["b", 2]]);

      expect(dataMap.lookup("b")).toBe(2);
    });
  });

  describe("delete", () => {
    test("if dataMap, changes nothing", () => {
      const dataMap = new DataMap();

      dataMap.delete("a");

      expect(dataMap.map).toEqual(new Map());
    });

    test("if finds item, deletes it", () => {
      const dataMap = new DataMap([["a", 1], ["b", 2]]);

      dataMap.delete("a");

      expect(dataMap.map).toEqual(new Map([["b", 2]]));
    });
  });

  describe("alter", () => {
    test("can alter contents", () => {
      const dataMap = new DataMap([["a", 1]]);

      dataMap.alter((v) => v + 1, "a");

      expect(dataMap.map).toEqual(new Map([["a", 2]]));
    });

    test("can alter specific contents", () => {
      const dataMap = new DataMap([["a", 1], ["b", 1]]);

      dataMap.alter((v) => v + 1, "a");

      expect(dataMap.map).toEqual(new Map([["a", 2], ["b", 1]]));
    });

    test("inserts if key is missing", () => {
      const dataMap = new DataMap([["a", 1], ["b", 1]]);

      dataMap.alter((v) => v instanceof Nothing ? 0 : v + 1, "c");

      expect(dataMap.map).toEqual(new Map([["a", 1], ["b", 1], ["c", 0]]));
    });
  });

  describe("insert", () => {
    test("can insert", () => {
      const dataMap = new DataMap();

      dataMap.insert("a", 1);

      expect(dataMap.map).toEqual(new Map([["a", 1]]));
    });

    test("insert overrides", () => {
      const dataMap = new DataMap([["a", 1]]);

      dataMap.insert("a", 2);

      expect(dataMap.map).toEqual(new Map([["a", 2]]));
    });

    test("can insert multiple times", () => {
      const dataMap = new DataMap();

      dataMap.insert("a", 1);
      dataMap.insert("b", 2);

      expect(dataMap.map).toEqual(new Map([["a", 1], ["b", 2]]));
    });
  });
});
