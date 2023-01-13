import { Document, WithId } from "mongodb";
import { db } from "../../db";

export interface Paginate<T> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface PaginateCollectionParams {
  collection: string;
  currentPage: number;
  limit: number;
  aggregations: any[];
  conditions: any;
}

export async function paginateCollection<CollectionI extends Document>({
  collection,
  currentPage,
  limit,
  aggregations = [],
  conditions = [],
}: PaginateCollectionParams): Promise<Paginate<WithId<CollectionI>>> {
  const offset = currentPage * limit;
  const agg = [
    ...aggregations,
    {
      $skip: offset,
    },
    {
      $limit: limit,
    },
  ];
  const cursor = db.collection(collection).aggregate<WithId<CollectionI>>(agg);

  const [totalDocs, docs] = await Promise.all([
    db.collection(collection).countDocuments(conditions),
    cursor.toArray(),
  ]);
  const totalPages = Math.floor(totalDocs / limit);

  return {
    docs,
    totalDocs,
    offset, // this act as skip property
    limit,
    totalPages,
    page: currentPage,
    pagingCounter: currentPage > 0 ? currentPage * limit : 0,
    hasPrevPage: currentPage > 0,
    hasNextPage: currentPage < totalPages,
    prevPage: currentPage > 0 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
  };
}
