import { type SxProps, type Theme } from '@mui/material';
import { type SystemStyleObject } from '@mui/system';

export type MergedSxProps = (
  | ((theme: Theme) => SystemStyleObject<Theme>)
  | boolean
  | SystemStyleObject<Theme>
)[];

export function mergeSx(...sxList: SxProps<Theme>[]): MergedSxProps {
  return ([] as MergedSxProps).concat(...sxList);
}
