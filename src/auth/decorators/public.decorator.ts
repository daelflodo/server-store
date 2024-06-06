import { SetMetadata } from '@nestjs/common';

import { PUBLIC_KEY } from '../../common';


export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);