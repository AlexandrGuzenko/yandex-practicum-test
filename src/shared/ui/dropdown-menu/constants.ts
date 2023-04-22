import { EPositions } from '../../enums';

export const positionEnumToCssClassMap: Record<EPositions, string> = {
  [EPositions.BottomLeft]: 'bottom left',
  [EPositions.BottomRight]: 'bottom right',
  [EPositions.TopLeft]: 'top left',
  [EPositions.TopRight]: 'top right',
}