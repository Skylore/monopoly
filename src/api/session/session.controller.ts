import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Session } from './session.entity';
import { SessionService } from './session.service';

@Crud({
  model: {
    type: Session,
  },
})
@Controller('sessions')
export class SessionController implements CrudController<Session> {
  constructor(public service: SessionService) {}
}
