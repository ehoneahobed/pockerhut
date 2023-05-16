const paginateAndSearch = async (model, searchOptions, page, limit) => {
    // Convert the page and limit values to integers
    page = parseInt(page);
    limit = parseInt(limit);
  
    // Set up the pagination options
    const skip = (page - 1) * limit;
    const options = {
      skip,
      limit
    };
  
    // Find the total number of documents based on the search options
    const totalDocuments = await model.countDocuments(searchOptions);
  
    // Find the documents based on the search and pagination options
    const documents = await model.find(searchOptions, null, options);
  
    // Create the metadata object with the pagination information
    const metadata = {
      page,
      limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      hasNextPage: page * limit < totalDocuments,
      hasPrevPage: page > 1,
    };
  
    // Return an object with the metadata and the documents
    return {
      metadata,
      documents
    };
  };

module.exports = paginateAndSearch;