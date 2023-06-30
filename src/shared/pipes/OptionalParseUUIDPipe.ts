import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  override transform(value: string | undefined, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return;
    }

    return super.transform(value, metadata);
  }
}
