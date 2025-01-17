import {IAdjacencyBonus} from '../ares/IAdjacencyBonus';
import {ITile} from '../ITile';
import {PlayerId} from '../common/Types';
import {SpaceBonus} from '../common/boards/SpaceBonus';
import {SpaceType} from '../SpaceType';
import {SpaceId} from './ISpace';

export interface SerializedBoard {
  spaces: Array<SerializedSpace>;
}

export interface SerializedSpace {
  id: SpaceId;
  spaceType: SpaceType;
  tile?: ITile;
  player?: PlayerId;
  bonus: Array<SpaceBonus>;
  adjacency?: IAdjacencyBonus,
  x: number;
  y: number;
}
