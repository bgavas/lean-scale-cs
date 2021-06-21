import { IsOptional, IsString, Min } from 'class-validator';

export class GetProductsDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;
}
