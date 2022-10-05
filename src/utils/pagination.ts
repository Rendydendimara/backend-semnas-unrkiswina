// import mongoose from 'mongoose';

/**
 * author: Jordi Yaputra
 *
 * @param {number} limitPerPage atleast 1.
 * @param {number} page starts from 1.
 * @returns
 */
export const calcSkip = (limitPerPage: any, page: any) => {
  return (page - 1) * limitPerPage;
};

/**
 *
 * @param {{ limitPerPage: number, page: number, total: number }} args
 * @returns
 */
export const calcPagination = ({ limitPerPage, page, total }: any) => {
  return {
    total,
    lastPage: Math.ceil(total / limitPerPage),
    perPage: limitPerPage,
    currentPage: page,
    from: (page - 1) * limitPerPage + 1,
    to: page * limitPerPage,
  };
};
export const calcPaginationCms = ({ limitPerPage, page, total }: any) => {
  const data = {
    total_record: total,
    total_pages: Math.ceil(total / limitPerPage),
    limit: limitPerPage,
    page,
  };
  if (data.total_pages < 1) {
    data.total_pages = Number(1);
  }
  return data;
};

/**
 * Query builder that handles pagination for mongoose query.
 *
 * You can modify the main query by
 *
 * **Usage example:**
 *
 * ```
 *    const paginator = findAndPaginate(
 *      Movie, {
 *        genre: "comedy",
 *        lang: "en-US"
 *      }, {
 *        limitPerPage: 5,
 *        page: 2
 *      },
 *      'title year genre lang stars popularity'
 *    )
 *
 *    paginator.addQuery(query => {
 *      // Modify the main query however you like.
 *      query.sort('popularity').populate("author", "name")
 *    })
 *
 *    const [movies, paginationData] = await paginator.exec();
 * ```
 *
 * **Author**: Jordi Yaputra.
 *
 * @param {mongoose.Model} Model mongoose.Model
 * @param {object} filter filter to pass onto Model.find(filter)
 * @param {{limitPerPage: Number = 10, page: Number}} pagination
 * @param {object|String|String[]} projection options for Model.find(filter, options)
 * @param {object} options options for Model.find(filter, options)
 * @returns {{ addQuery: (query: mongoose.Query) => this, exec: Promise }} Paginator
 */
// const findAndPaginate = (
//   Model:any,
//   filter:any,
//   { limitPerPage = 10, page = 1 },
//   projection:any = null,
//   options = {}
// ) => {
//   const skip = calcSkip(limitPerPage, page);
//   const query = Model.find(filter, projection, options)
//     .limit(limitPerPage)
//     .skip(skip);

//   /**
//    *
//    * @param {(query:mongoose.Query) => void} buildQuery
//    * @returns
//    */
//   this.addQuery = (buildQuery::any) => {
//     buildQuery(query);
//     return this;
//   };

//   this.exec = async () => {
//     const totalQuery = Model.countDocuments(filter);

//     const [docs, total] = await Promise.all(
//       [query, totalQuery].map((query) => query.exec())
//     );
//     const pagination = calcPagination({ limitPerPage, page, total });

//     return [docs, pagination];
//   };

//   return this;
// };

export const paginationDefaultOptions = {
  limitPerPage: 10,
  page: 1,
};

export const paginationOptionsType = {
  limitPerPage: Number(),
  page: Number(),
};

/**
 * Capture and sanitize pagination Query.
 * It mostly changes string to number but also make sure that `limitPerPage` and `page`
 * value will be atlease 1.
 * This function will also translate `limit` to `limitPerPage` for convenience usage.
 *
 * E.g.:
 * ```
 *  (req, res) => {
 *    // Whereas req.query may contains { limit, page }.
 *    const paginationQuery = sanitizePagination(req.query);
 *    // Now paginationQuery will have sanitized { limitPerPage, page }
 *    // You can extract them like below:
 *    const { limitPerPage, page } = paginationQuery;
 *  }
 * ```
 *
 * author: Jordi Yaputra
 *
 * @param {{limitPerPage: number|string, page: number|string}} paginationOptions
 * @returns sanitized paginationOptions
 */
export const sanitizePagination = ({ limit, limitPerPage, page }: any) => ({
  limitPerPage: Math.max(Number(limitPerPage || limit || 1), 1),
  page: Math.max(Number(page || 1), 1),
});

export const sortPagination = (sort: string) => {
  switch (sort) {
    case 'date-asc':
      return { createdAt: 1 };
    case 'date-desc':
      return { createdAt: -1 };
    case 'name-asc':
      return { name: 1 };
    case 'name-desc':
      return { name: -1 };
    default:
      return null;
  }
};

export const paginationData = (data: any, meta: any) => {
  let res: any = {
    data,
    meta,
  };
  return res;
};
