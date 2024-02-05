import { IsNotEmpty, IsArray, ArrayNotEmpty, IsDateString} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class WeatherDTO {
  @ApiProperty({
    description: 'Array of cities',
    example: ['Curitiba', 'Sao Paulo'],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty({ message: 'cities array should not be empty.' })
  @Transform(({ value }) => value.map((city: string) => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()))
  readonly cities: string[];


   @ApiProperty({
    description: 'Start date in yyyy-mm-dd format',
    example: '2024-02-04',
  })
  @IsNotEmpty()
  @IsDateString({strict: true}, { message: 'date format "yyyy-mm-dd"".' })
  readonly startDate: string;

  @ApiProperty({
    description: 'End date in yyyy-mm-dd format',
    example: '2024-02-10',
  })
  @IsNotEmpty()
  @IsDateString({strict: true}, { message: 'date format "yyyy-mm-dd".' })
  readonly endDate: string;
} 