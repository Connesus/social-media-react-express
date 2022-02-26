import { FilterQuery, Schema, SchemaOptions } from "mongoose";

// TODO: Fix 'any' types

export type TPaginationOptions = {
  filter: FilterQuery<any>;
  orderBy?: string;
  sort: string | any;
  limit?: number;
  anchor?: any;
};

export interface pluginModel {
  firstPage(options: TPaginationOptions): this;
  nextPage(options: TPaginationOptions): this;
  prevPage(options: TPaginationOptions): this;
}

export default function paginationPlugin(
  schema: Schema,
  options: SchemaOptions
) {
  schema.statics.firstPage = function ({
    filter,
    orderBy = "_id",
    sort,
    limit = 10,
  }: TPaginationOptions) {
    return this.find({ ...filter }, {}, { sort }).limit(limit);
  };
  schema.statics.nextPage = function ({
    filter,
    orderBy = "_id",
    sort,
    limit = 10,
    anchor,
  }: TPaginationOptions) {
    return this.find(
      { ...filter, [orderBy]: { $lt: anchor } },
      {},
      { sort }
    ).limit(limit);
  };
  schema.statics.prevPage = function ({
    filter,
    orderBy = "_id",
    sort,
    limit = 10,
    anchor,
  }: TPaginationOptions) {
    return this.find(
      { ...filter, [orderBy]: { $gt: anchor } },
      {},
      { sort }
    ).limit(limit);
  };
}
