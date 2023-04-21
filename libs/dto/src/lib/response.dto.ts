import { Type, applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export const PaginationResponse = (model: any) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            properties: {
              count: {
                type: 'number',
                example: 100,
              },
              page: {
                type: 'number',
                example: 1,
              },
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        },
      },
    })
  );
};

export const ListResponse = (model: any) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    })
  );
};

export const CommonCreateResponse = (model: any) => {
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

export const CommonResponse = (model: any) => {
  return applyDecorators(
    ApiOkResponse({
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
