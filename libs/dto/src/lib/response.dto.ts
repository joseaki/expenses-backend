import { Type, applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export const PaginationResponse = (model: any) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          totalPages: {
            type: 'number',
          },
          currentPage: {
            type: 'number',
          },
          itemsPerPage: {
            type: 'number',
          },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    })
  );
};

export const CommonResponse = (model: any) => {
  return applyDecorators(
    ApiCreatedResponse({
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(model),
          },
        },
      },
    })
  );
};
