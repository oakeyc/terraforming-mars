import {SpectatorId} from '../common/Types';
import {Color} from '../Color';
import {ViewModel} from './PlayerModel';

export interface SpectatorModel extends ViewModel {
  id: SpectatorId;
  color: Color;
}
