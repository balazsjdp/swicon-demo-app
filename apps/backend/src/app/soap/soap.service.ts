import { Injectable, Logger } from '@nestjs/common';
import * as soap from 'soap';

@Injectable()
export class SoapService {
  private readonly logger = new Logger(SoapService.name);

  /**
   * Creates and returns a SOAP client.
   * @param wsdl URL or path to the WSDL file
   */
  async getClient<T>(wsdl: string): Promise<T> {
    this.logger.debug(`Creating SOAP client for: ${wsdl}`);

    try {
      const client = await soap.createClientAsync(wsdl);
      return client as T;
    } catch (error) {
      this.logger.error(`Failed to create SOAP client for ${wsdl}`, error);
      throw error;
    }
  }
}
