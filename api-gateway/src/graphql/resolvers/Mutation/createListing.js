import ListingService from "#root/adapters//ListingService";

const createListingResolver = async (obj, { description, title }, context) => {
  if (!context.res.locals.userSession) throw new Error("Not logged in!");

  return await ListingService.createListing({ description, title });
};

export default createListingResolver;
