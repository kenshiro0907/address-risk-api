import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './address.entity';

@Controller('api/addresses')
export class AddressController {
  constructor(private readonly addressesService: AddressService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    try {
      if (!createAddressDto.q || typeof createAddressDto.q !== 'string') {
        throw new HttpException(
          {
            error: "Le champ 'q' est requis et doit être une chaîne non vide.",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.addressesService.create(createAddressDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur serveur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/risks')
  async findRisks(@Param('id') id: string): Promise<any> {
    try {
      return await this.addressesService.findRisks(+id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur serveur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
