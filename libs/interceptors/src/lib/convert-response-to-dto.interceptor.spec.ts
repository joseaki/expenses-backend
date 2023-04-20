import { CommitRequestDto } from 'src/dto/commitRequest.dto';
import { ConvertResponseToDtoInterceptor } from './convert-response-to-dto.interceptor';

describe('ConvertResponseToDtoInterceptor', () => {
  it('should be defined', () => {
    expect(new ConvertResponseToDtoInterceptor(CommitRequestDto)).toBeDefined();
  });
});
