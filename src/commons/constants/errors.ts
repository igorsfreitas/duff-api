export const errorMessages = {
  commons: {
    notFound: (param: string) => ({
      code: 'NOT_FOUND_ERR_01',
      message: `${param} not found`,
    }),
    internalServerError: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    },
  },
  beerType: {
    notFound: {
      code: 'BEER_TYPE_ERR_01',
      message: 'Tipo de cerveja não encontrado.',
    },
  },
};

const errorsCode = {
  1: 'ORM_ERROR',
  401: 'UNAUTHORIZED',
  500: 'INTERNAL_SERVER_ERROR',
};

export const getErrorCode = (status: number) => {
  return errorsCode[status] || 'UNDEFINED_CODE';
};
