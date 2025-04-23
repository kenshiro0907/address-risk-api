import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AddressService {
  private readonly banApiUrl = 'https://api-adresse.data.gouv.fr/search';
  private readonly georisquesApiUrl =
    'https://www.georisques.gouv.fr/api/v3/v1/resultats_rapport_risque';
  private readonly axios: AxiosInstance;

  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {
    this.axios = axios.create({
      timeout: 3000,
    });
  }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const response = await this.axios.get(
        `${this.banApiUrl}/?q=${encodeURIComponent(createAddressDto.q)}&limit=1`,
      );

      if (response.status !== 200) {
        throw new HttpException(
          "Erreur serveur : impossible de contacter l'API externe.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const data = response.data;
      if (!data.features || data.features.length === 0) {
        throw new HttpException(
          'Adresse non trouvée. Aucun résultat ne correspond à votre recherche.',
          HttpStatus.NOT_FOUND,
        );
      }

      const feature = data.features[0];
      const properties = feature.properties;
      const geometry = feature.geometry;

      const address = this.addressesRepository.create({
        label: properties.label,
        housenumber: properties.housenumber,
        street: properties.street,
        postcode: properties.postcode,
        citycode: properties.citycode,
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      });

      return await this.addressesRepository.save(address);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Erreur serveur : impossible de contacter l'API externe.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findRisks(id: number): Promise<any> {
    const address = await this.addressesRepository.findOne({ where: { id } });

    if (!address) {
      throw new HttpException('Adresse non trouvée.', HttpStatus.NOT_FOUND);
    }

    try {
      const response = await this.axios.get(
        `${this.georisquesApiUrl}?latlon=${address.longitude},${address.latitude}`,
      );

      if (response.status !== 200) {
        throw new HttpException(
          'Erreur serveur : échec de la récupération des données de Géorisques.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return JSON.parse(response.data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur serveur : échec de la récupération des données de Géorisques.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
